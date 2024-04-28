// graphql/mutations.js
export const CREATE_ARTWORK = `
  mutation CreateArtwork($input: ArtworkInput!) {
    createArtwork(input: $input) {
      id
      name
      description
      image
    }
  }
`;