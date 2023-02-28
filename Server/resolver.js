const users = [
    {id: 1, name: 'Gleb Bedrosovich', isBatrak: false, salary: 1000},
    {id: 2, name: 'Vladislav', isBatrak: true, salary: 20000},
    {id: 3, name: 'Mr-x', isBatrak: false, salary: 15000},
    {id: 4, name: 'Mr-XY', isBatrak: true, salary: 40000},
    {id: 5, name: 'Ms-XX', isBatrak: true, salary: 50000},
];

const ones = [
    {id: 1, type: 'dl', date: '2022-01-01', userId: 1},
    {id: 2, type: 'idl', date: '2022-02-02', userId: 2},
    {id: 3, type: 'show', date: '2022-03-03', userId: 3},
    {id: 4, type: 'dl', date: '2022-01-01', userId: 3},
    {id: 5, type: 'idl', date: '2022-02-02', userId: 1},
    {id: 6, type: 'show', date: '2022-03-03', userId: 2},
];

const emptyData = '[ДАННЫЕ УДАЛЕНЫ]';

const resolvers = {
    Query: {
        users: () => users,
        ones: () => ones,
        user: (parent, {id}) => {
            return users.find(user => +user.id === +id);
        },
    },
    Mutation: {
        createUser: (_, {name, salary, isBatrak}) => {
            const id = users[users.length - 1].id + 1;
            const user = {id, name, salary, isBatrak};
            users.push(user);
            return user;
        },
    },
    User: {
        ones: (parent, args, context, info) => {
            const {type} = args;
            const userOnes = ones.filter((one) => +one.userId === +parent.id);
            if (type) {
                return userOnes.filter((one) => one.type === type);
            }

            return userOnes;
        },
        salary: (parent) => {
            return parent.isBatrak ? parent.salary : emptyData;
        },
    },
};

module.exports = resolvers;
