<template>
    <form @submit.prevent="handleSubmit">
        <div>
            <label for="name">Name:</label>
            <input
                type="text"
                id="name"
                v-model="name"
            />
        </div>
        <div>
            <label for="salary">Salary:</label>
            <input
                type="number"
                id="salary"
                v-model.number="salary"
            />
        </div>
        <div>
            <label for="isBatrak">isBatrak:</label>
            <input
                type="checkbox"
                id="isBatrak"
                v-model="isBatrak"
            />
        </div>
        <button
            type="submit"
            :disabled="loading"
        >Create User
        </button>
        <p v-if="error">{{ error.message }}</p>
    </form>
    <div class="user-list">
        <ul>
            <li
                v-for="user in users"
                :key="user.id"
                class="user-item"
            >
                <div>{{ user.id }}</div>
                <div>{{ user.name }}</div>
                <div>{{ user.salary }}</div>
                <div>{{ user.isBatrak }}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {useQuery, useMutation} from '@vue/apollo-composable';
    import {GET_USERS, CREATE_USER} from '@/graphql/queries';
    import {ref} from 'vue';
    
    export default {
        setup() {
            const {loading, error, mutate: createUser} = useMutation(CREATE_USER);
            const name = ref('');
            const salary = ref(0);
            const isBatrak = ref('');
            const handleSubmit = async () => {
                try {
                    const result = await createUser({
                        name: name.value,
                        isBatrak: !!isBatrak.value,
                        salary: parseInt(salary.value),
                    });
                    console.log(result.data);
                } catch (e) {
                    console.error(e);
                }
            };
            
            const {onResult} = useQuery(GET_USERS);
            let users = ref([]);
            onResult((res) => {
                users.value = res.data.users;
            });
            return {
                users: users,
                loading,
                error,
                name,
                isBatrak,
                salary,
                handleSubmit,
            };
        },
    };
</script>

<style scoped>
    .user-list {
        display: grid;
        grid-gap: 10px;
    }
    
    .user-item {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 10px;
        list-style-type: none;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
</style>
