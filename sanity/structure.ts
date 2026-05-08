import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('hijink').title('Other Hijinks'),
      S.divider(),
      S.listItem()
        .title('Book Club')
        .child(
          S.list()
            .title('Book Club')
            .items([
              S.documentTypeListItem('bookClubBook').title('Books'),
              S.documentTypeListItem('bookClubMember').title('Members'),
              S.listItem()
                .title('Ratings')
                .child(
                  S.list()
                    .title('Ratings')
                    .items([
                      S.documentTypeListItem('bookClubRating').title('All Ratings'),
                      S.listItem()
                        .title('By Book')
                        .child(
                          S.documentTypeList('bookClubBook')
                            .title('Select a Book')
                            .child((bookId) =>
                              S.documentList()
                                .title('Ratings for Book')
                                .filter('_type == "bookClubRating" && book._ref == $bookId')
                                .params({ bookId })
                            )
                        ),
                      S.listItem()
                        .title('By Member')
                        .child(
                          S.documentTypeList('bookClubMember')
                            .title('Select a Member')
                            .child((memberId) =>
                              S.documentList()
                                .title('Ratings by Member')
                                .filter('_type == "bookClubRating" && member._ref == $memberId')
                                .params({ memberId })
                            )
                        ),
                    ])
                ),
            ])
        ),
    ])
