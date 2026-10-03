# Route Model: Retirement

No database/storage entity. Approved routing contract:

| Input | Final behavior |
|-------|----------------|
| /resume | General unknown-route fallback to / |
| /work/art | General unknown-route fallback to / |
| /work | Exact alias to /#articles |
| /work/articles | Exact alias to /#articles |
| /work/apps | Exact alias to /#vault |
| /work/articles/:id | Existing lazy article-detail contract009 |
| /contact | Existing lazy modal contract010 |
| Other unknown path | Existing general fallback to / |

No named retired-path route/redirect exists after retirement. Active exact aliases
must not consume detail/nested URLs. Retired resolution performs no Resume/PDF/artwork
request; Home viewport-driven active sections may legitimately load under shell002.
Pending Contact lock may block a same-app navigation attempt before any resolution.

Remove Resume configuration entry in both environment variants only after no active
consumer remains. Remote file remains hosted and is outside this model.
