import { groq } from 'next-sanity'

// Projects

export const projectsQuery = groq`
  *[_type == "project" && disabled != true] | order(featuredIndex asc, year desc) {
    _id,
    title,
    slug,
    hook,
    description,
    year,
    role,
    stack,
    skills,
    previewImage,
    mainImage,
    featured,
    featuredIndex,
  }
`

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true && disabled != true] | order(featuredIndex asc) {
    _id,
    title,
    slug,
    hook,
    description,
    year,
    role,
    stack,
    previewImage,
    mainImage,
    featuredIndex,
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    hook,
    description,
    year,
    role,
    stack,
    skills,
    previewImage,
    mainImage,
    featured,
    body[] {
      ...,
      _type == "projectSection" => {
        heading,
        anchor,
        content[] {
          ...,
          _type == "projectSubsection" => {
            heading,
            content
          }
        }
      }
    }
  }
`

// Book Club — Books

export const booksQuery = groq`
  *[_type == "bookClubBook"] | order(title asc) {
    _id,
    title,
    author,
    genre,
    inProgress,
    coverImage,
    mvp->{ _id, name, photo },
    review,
  }
`

export const bookByIdQuery = groq`
  *[_type == "bookClubBook" && _id == $id][0] {
    _id,
    title,
    author,
    genre,
    inProgress,
    coverImage,
    mvp->{ _id, name, photo },
    review,
  }
`

// Book Club — Ratings

export const ratingsByBookQuery = groq`
  *[_type == "bookClubRating" && book._ref == $bookId] {
    _id,
    value,
    member->{ _id, name, photo }
  }
`

export const ratingsByMemberQuery = groq`
  *[_type == "bookClubRating" && member._ref == $memberId] {
    _id,
    value,
    book->{ _id, title, author, coverImage }
  }
`

// Book Club — Members

export const membersQuery = groq`
  *[_type == "bookClubMember"] | order(name asc) {
    _id,
    name,
    photo,
  }
`

export const memberByIdQuery = groq`
  *[_type == "bookClubMember" && _id == $memberId][0] {
    _id,
    name,
    photo,
    "ratings": *[_type == "bookClubRating" && member._ref == ^._id]{ value, book->{ _id, title, author } },
    "mvpBooks": *[_type == "bookClubBook" && mvp._ref == ^._id]{ _id, title, author, coverImage },
  }
`
