import { projectSchema } from './project'
import { bookClubBookSchema } from './bookClubBook'
import { bookClubMemberSchema } from './bookClubMember'
import { bookClubRatingSchema } from './bookClubRating'

export const schemaTypes = [
  projectSchema,
  bookClubMemberSchema,
  bookClubBookSchema,
  bookClubRatingSchema,
]
