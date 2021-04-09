<template>
    <div>
        <div v-if="tutorial" class="edit-form">
            <div class="card">
                <div class="card-header">
                    <div class="container m-2">
                        <div class="row">
                            <div class="col">
                                <h4>Tutorial</h4>
                            </div>
                            <div class="col">
                                <button @click="deleteItem(tutorial)" type="button" class="btn btn-danger"><span class="fa fa-trash"></span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <form class="container" @submit.prevent="update(tutorial)">
                        <div class="form-group">
                            <input type="text" name="title" id="title" class="form-control" v-model="tutorial.title" placeholder="Title">
                        </div>
                        <div class="form-group">
                            <input type="text" name="description" id="description" class="form-control" v-model="tutorial.description" placeholder="Description">
                        </div>
                        <button type="submit" class="btn btn-primary btn-block"><span class="fa fa-save"></span> Save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TutorialService from '../service/Tutorial.data'

export default {
    data(){
        return {
            tutorial: null,
        }
    },
    methods: {
        getTutorial(id){
            TutorialService.getById(id).then(db => {
                console.log(db);
                this.tutorial = db.data;
            }).catch();
        },
        update(tutorial){
            TutorialService.update(this.tutorial._id, tutorial).then(() => {
                this.$router.push({ name: "tutorials" });
            }).catch(err => {
                console.log(err);
            });
        },
        deleteItem(item){
            TutorialService.deleteById(item._id).then(() => {
                this.$router.push({ name: "tutorials" });
            }).catch(err => {
                console.log(err);
            });
        }
    },
    mounted() {
        this.getTutorial(this.$route.params.id);
    }
}
</script>