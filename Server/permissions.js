const {rule, shield} = require('graphql-shield');

const isSalaryMoreThan3000 = rule()(async (parent, args) => {
    console.log('parent', parent);
    return parent.isBatrak;
});

const permissions = shield({

});

// const permissions = shield({
//     User: {
//         salary: isSalaryMoreThan3000,
//     },
// });

module.exports = permissions;
