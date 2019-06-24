<template>
    <div class="login">
        <h2>Login View:</h2>
        <google-signin-btn label="Sign In" customClass="my-button" @click="signin"/>
    </div>
</template>
<script>
    export default{
        mounted:function(){
            this.$gapi.currentUser()
            .then(user => {
                if (user) {
                console.log('Signed in as %s', user.name)
                this.$emit('setUser',user)
                this.$emit('changeView','home')
                } else {
                console.log('No user is connected.')
                }
            })
        },
        methods:{
            signin:function(){
                this.$gapi.signIn()
                .then(user => {
                    console.log('Signed in as %s', user.name)
                    this.$emit('changeView','home')
                })
                .catch(err => {
                    console.error('Not signed in: %s', err.error)
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .login{
        height: auto;
        padding: 10em
    }
</style>