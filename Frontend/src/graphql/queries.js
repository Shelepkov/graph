import {gql} from '@apollo/client/core';

export const GET_USERS = gql`
    query {
        users{
            id
            name
            salary
            isBatrak
            ones {
                id
            
            }
        },
    }
`;

export const CREATE_USER = gql`
    mutation CreateUser($name: String!, $salary: Int!, $isBatrak: Boolean!) {
        createUser(name: $name, salary: $salary, isBatrak: $isBatrak) {
            id
            name
            salary
        }
    }
`;
