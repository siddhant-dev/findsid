import {
  SectionActivationCoordinator,
  sectionActivationRootMargin,
} from './section-activation';

describe('SectionActivationCoordinator', () => {
  it('shares an in-flight section load and retains the loaded value', async () => {
    let resolveLoad!: (value: string) => void;
    const loader = jasmine
      .createSpy('loadArticles')
      .and.returnValue(new Promise<string>((resolve) => (resolveLoad = resolve)));
    const activation = new SectionActivationCoordinator({ articles: loader });

    const first = activation.activate('articles');
    const second = activation.activate('articles');
    expect(loader).toHaveBeenCalledTimes(1);
    expect(activation.state('articles').status).toBe('loading');

    resolveLoad('articles-module');
    await expectAsync(first).toBeResolvedTo('articles-module');
    await expectAsync(second).toBeResolvedTo('articles-module');
    expect(activation.state('articles').status).toBe('ready');
    expect(await activation.activate('articles')).toBe('articles-module');
    expect(loader).toHaveBeenCalledTimes(1);
  });

  it('exposes a scoped error and retries only the failed section', async () => {
    const failure = new Error('chunk unavailable');
    const loader = jasmine
      .createSpy('loadVault')
      .and.returnValues(Promise.reject(failure), Promise.resolve('vault-module'));
    const activation = new SectionActivationCoordinator({ vault: loader });

    await expectAsync(activation.activate('vault')).toBeRejectedWith(failure);
    expect(activation.state('vault')).toEqual({ status: 'error', error: failure });
    await expectAsync(activation.retry('vault')).toBeResolvedTo('vault-module');
    expect(activation.state('vault').status).toBe('ready');
    expect(loader).toHaveBeenCalledTimes(2);
  });

  it('does not publish a late module after the owner is destroyed', async () => {
    let resolveLoad!: (value: string) => void;
    const loader = () =>
      new Promise<string>((resolve) => (resolveLoad = resolve));
    const activation = new SectionActivationCoordinator({ articles: loader });
    const pending = activation.activate('articles');

    activation.destroy();
    resolveLoad('late-module');

    expect(await pending).toBeUndefined();
    expect(activation.state('articles').status).toBe('disposed');
  });

  it('converts the 20rem activation distance using the current root font size', () => {
    expect(sectionActivationRootMargin(16)).toBe('0px 0px 320px 0px');
    expect(sectionActivationRootMargin(20)).toBe('0px 0px 400px 0px');
    expect(() => sectionActivationRootMargin(Number.NaN)).toThrowError();
  });
});
