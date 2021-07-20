// activityQuery: returns user's activities
export const activityQuery: string = `query ($userId: Int, $page: Int, $perPage: Int, $type: ActivityType) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      activities(userId: $userId, sort: ID_DESC, type: $type) {
        __typename
        ... on ListActivity {
          id
          media {
            id
            type
            title {
              romaji
            }
            coverImage {
              medium
            }
          }
          type
          createdAt
          status
          progress
        }
      }
    }
  }`