import { createApp } from 'vue';
import App from './App.vue';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';

const apolloClient = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
});

const app = createApp(App);

app.provide(DefaultApolloClient, apolloClient);

app.mount('#app');
