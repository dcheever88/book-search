import { gql } from '@apollo.clent';

export const GET_ME = gql`
    {
        me {
            _id
            username
            email
            bookCout
            savedBooks {
                bookId
                authors
                title
                description
                link
                image
            }
        }
    }
`;