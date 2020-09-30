<template>
<div id="app">
    <div></div>
    <h2>{{ userID }}</h2>
    {{ state.user.username }}
    fullname: {{ fullName }}
    <strong>followers: {{ state.followers }}</strong>
    <div v-if="state.user.isAdmin">Admin</div>
    <div v-else>not Admin</div>
    <button @click="followUser">follow!</button>
    twoots
    <TwootItem v-for="(twoot, index) in state.user.twoots" :key="twoot.id" :username="state.user.username" :twoot="twoot" :index="index" @favourite="toggleFavourite"></TwootItem>
    <form @submit.prevent="createNewTwoot" :class="{ exceeded: newTwootCharacterCount > 180 }">
        <label for="new-twoot">
            <strong>new twoot</strong>
        </label>
        <textarea id="new-twoot" rows="4" v-model="state.newTwootContent"></textarea>
        <strong>({{ newTwootCharacterCount }}/180)</strong>
        <div>
            <label for="new-twoot-type">Type:</label>
            <select v-model="state.selectedTwootType">
                <option v-for="(option, index) in state.twootTypes" :value="option.value" :key="index">{{ option.name }}</option>
            </select>
        </div>
        <button>Twoot</button>
    </form>
</div>
</template>

<script>
import {
    reactive,
    computed,
    ref
} from 'vue';
import TwootItem from './Twoot.vue';
import {
    useRoute
} from 'vue-router';
import {
    users
} from '../assets/users.js';
export default {
    name: 'UserProfile',
    components: {
        TwootItem
    },
    setup() {
        const route = useRoute();
        const userID = computed(() => route.params.userID);
        console.log(userID.value);
        const state = reactive({
            newTwootContent: 'placeholder',
            selectedTwootType: 'instant',
            twootTypes: [{
                    value: 'draft',
                    name: 'Draft'
                },
                {
                    value: 'instant',
                    name: 'Instant Twoot'
                }
            ],
            user: ref(users[userID.value].user) || users[0].user,
            followers: ref(users[userID.value].followers) || users[0].followers
        });

        function createNewTwoot() {
            if (state.newTwootContent && state.selectedTwootType !== 'draft') {
                state.user.twoots.unshift({
                    id: state.user.twoots.length + 1,
                    content: state.newTwootContent
                });
            }
            state.newTwootContent = 'placholder';
        }

        function toggleFavourite(id) {
            alert('favoured twoot with ' + id);
        }

        function followUser() {
            state.followers++;
        }
        const newTwootCharacterCount = computed(() => {
            return state.newTwootContent.length;
        });
        const fullName = computed(() => {
            return `${state.user.username} ${state.user.email}`;
        });

        return {
            state,
            newTwootCharacterCount,
            fullName,
            toggleFavourite,
            createNewTwoot,
            followUser,
            userID
        };
    },
    mounted() {
        console.log(users);
    }
};
</script>

<style lang="scss">
.exceeded {
    color: red;
    border-color: red;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    display: flex;
    flex-direction: column;
}
</style>
