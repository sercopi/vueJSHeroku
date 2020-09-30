<template>
<div>
    list of users:
    <router-link v-for="(user, index) in users" :key="index" :to="{ name: 'UserProfile', params: { userID: index } }"><br />{{ user.user.username }}</router-link>
</div>
</template>

<script>
import {
    users
} from '@/assets/users.js';

export default {
    setup() {
        return {
            users
        };
    }
};
</script>

<style lang="scss"></style>
