import { groq } from 'next-sanity'

// Projects

export const projectsQuery = groq`
  *[_type == "project" && disabled != true] | order(featuredIndex asc) {
    _id,
    title,
    slug,
    hook,
    description,
    previewImage { sanityImage { ..., asset-> }, externalUrl, alt },
    mainImage { sanityImage { ..., asset-> }, externalUrl, alt },
    featured,
    featuredIndex,
  }
`

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true && disabled != true] | order(featuredIndex asc) {
    _id,
    title,
    slug,
    label,
    hook,
    description,
    previewImage { sanityImage { ..., asset-> }, externalUrl, alt },
    featuredIndex,
  }
`

export const allProjectsQuery = groq`
  *[_type == "project" && disabled != true] | order(featured desc, featuredIndex asc) {
    _id,
    title,
    slug,
    label,
    hook,
    description,
    tags,
    previewImage { sanityImage { ..., asset-> }, externalUrl, alt },
    featured,
    featuredIndex,
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    label,
    hook,
    description,
    tags,
    highlights,
    previewImage { sanityImage { ..., asset-> }, externalUrl, alt },
    mainImage { sanityImage { ..., asset-> }, externalUrl, alt },
    featured,
    body[] {
      _type,
      heading,
      anchor,
      navLabel,
      content[] {
        ...,
        _type == "imageBlock" => {
          ...,
          sanityImage { ..., asset-> },
        },
        _type == "imageGrid" => {
          ...,
          images[] { ..., sanityImage { ..., asset-> } },
        },
        _type == "videoEmbed" => {
          ...,
          sanityFile { ..., asset-> },
          thumbnail { ..., asset-> },
        },
        _type == "teamBlock" => {
          ...,
          members[] { ..., sanityPhoto { ..., asset-> } },
        },
        _type == "projectSubsection" => {
          heading,
          content[] {
            ...,
            _type == "imageBlock" => {
              ...,
              sanityImage { ..., asset-> },
            },
            _type == "imageGrid" => {
              ...,
              images[] { ..., sanityImage { ..., asset-> } },
            },
            _type == "videoEmbed" => {
              ...,
              sanityFile { ..., asset-> },
              thumbnail { ..., asset-> },
            },
            _type == "teamBlock" => {
              ...,
              members[] { ..., sanityPhoto { ..., asset-> } },
            },
          },
        },
      },
    },
  }
`

// Book Club — Books

export const booksWithRatingsQuery = groq`
  *[_type == "bookClubBook"] | order(title asc) {
    _id,
    title,
    author,
    genre,
    pages,
    yearPublished,
    inProgress,
    dateCompleted,
    coverImage,
    "ratingValues": *[_type == "bookClubRating" && book._ref == ^._id].value
  }
`

export const bookByIdQuery = groq`
  *[_type == "bookClubBook" && _id == $id][0] {
    _id,
    title,
    author,
    genre,
    pages,
    yearPublished,
    inProgress,
    dateCompleted,
    coverImage,
    mvp->{ _id, name, photo },
    "ratings": *[_type == "bookClubRating" && book._ref == ^._id] | order(_createdAt asc) {
      _id,
      _createdAt,
      value,
      review,
      member->{ _id, name, photo, tagline }
    }
  }
`

// Book Club — Members

export const membersQuery = groq`
  *[_type == "bookClubMember"] | order(name asc) {
    _id,
    name,
    tagline,
    photo,
    "ratingCount": count(*[_type == "bookClubRating" && member._ref == ^._id]),
    "mvpWins": count(*[_type == "bookClubBook" && mvp._ref == ^._id])
  }
`

export const memberByIdQuery = groq`
  *[_type == "bookClubMember" && _id == $memberId][0] {
    _id,
    name,
    tagline,
    photo,
    "mvpBooks": *[_type == "bookClubBook" && mvp._ref == ^._id] {
      _id, title, author, coverImage
    },
    "ratings": *[_type == "bookClubRating" && member._ref == ^._id] | order(book->dateCompleted desc) {
      _id,
      _createdAt,
      value,
      review,
      book->{ _id, title, author, genre, coverImage, yearPublished, pages, dateCompleted, inProgress }
    }
  }
`

export const allBookIdsQuery = groq`*[_type == "bookClubBook"]{ _id }`
export const allMemberIdsQuery = groq`*[_type == "bookClubMember"]{ _id }`
