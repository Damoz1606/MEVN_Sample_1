<template>
    <div class="submit-form">
        <form @submit.prevent="saveTutorial(tutorial)" v-if="!submitted">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" v-model="tutorial.title" name="title" id="title" class="form-control" required>
            </div>

            <div class="form-group">
                <label for="description">Description</label>
                <input type="text" v-model="tutorial.description" name="description" id="description" class="form-control" required>
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block"><span class="fa fa-save"></span> Save</button>
            </div>
        </form>
        <div v-else>
            <h4>It was Submitted</h4>
            <button @click="returnHome()" class="btn btn-light btn-block">Home</button>
            <button @click="newTutorial()" class="btn btn-primary btn-block">Create</button>
        </div>
    </div>
</template>

<script>

import TutorialService from '../service/Tutorial.data'

export default {
    data(){
        return {
            tutorial: {},
            submitted: false
        }
    },
    methods: {
        newTutorial(){
            this.submitted = false;
            this.tutorial = {};
        },
        saveTutorial(type) {
            TutorialService.post(type).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
            this.submitted = true;
            this.tutorial = {};
        },
        returnHome(){
            this.$router.push({ name: "tutorials" });
        }
    }
}
</script>