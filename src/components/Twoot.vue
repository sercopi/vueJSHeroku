<template>
<div style="background-color:red;margin:5px" @click="favouriteTwoot(twoot.id)">
    Twoot number: {{ index }} Username: {{ username }}
    <br />
    Content: {{ twoot.content }}
</div>
</template>

<script>
export default {
    name: 'TwootItem',
    props: {
        username: {
            type: String,
            required: true
        },
        twoot: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    setup(props, ctx) {
        function favouriteTwoot(id) {
            ctx.emit('favourite', id);
        }
        return {
            favouriteTwoot
        };
    }
};
</script>
