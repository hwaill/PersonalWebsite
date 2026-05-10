import { projectSchema } from './project'
import { hijinkSchema } from './hijink'
import { bookClubBookSchema } from './bookClubBook'
import { bookClubMemberSchema } from './bookClubMember'
import { bookClubRatingSchema } from './bookClubRating'
import { resumeSchema } from './resume'

export const schemaTypes = [
  projectSchema,
  hijinkSchema,
  bookClubMemberSchema,
  bookClubBookSchema,
  bookClubRatingSchema,
  resumeSchema,
]
