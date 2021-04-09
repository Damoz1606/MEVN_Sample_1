<template>
    <div class="list row">
        <div class="col-md-6">
            <h4>Tutorial List</h4>
            <div class="card">
                <div class="card-header">
                    <div class="btn-group">
                        <button type="button" v-if="page != 1" @click="page--" class="btn btn-sm btn-outline-secondary">
                            <span class="fa fa-chevron-left"></span>
                        </button>
                        <button type="button" v-for="pageNumber in pages.slice(page - 1, page + 10)" :key="pageNumber" @click="page = pageNumber" v-bind:class="[(page==pageNumber)?'btn btn-sm btn-outline-secondary active':'btn btn-sm btn-outline-secondary']">
                        {{pageNumber}}    
                        </button>
                        <button type="button" v-if="page < pages.length" @click="page++" class="btn btn-sm btn-outline-secondary">
                            <span class="fa fa-chevron-right"></span>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Tutorial</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-for="item in displayPages" :key="item._id">
                            <tr>
                                <td>{{item.title}}</td>
                                <td>
                                    <div class="btn-group">
                                        <a :href="'/tutorials/' + item._id" class="btn btn-primary"><span class="fa fa-eye"></span></a>
                                        <button class="btn btn-warning"><span class="fa fa-edit"></span></button>
                                        <button type="button" @click="deleteItem(item)" class="btn btn-danger"><span class="fa fa-trash"></span></button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="card-footer">
                    <div class="mr-auto">
                        <button @click="removeAll()" class="btn btn-danger"><span class="fa fa-trash"></span> Delete All</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TutorialService from '../service/Tutorial.data'
export default {
    data() {
        return {
            tutorials: [],
            page: 1,
            perPage: 3,
            pages: []
        }
    },
    created(){
        this.listTutorials();
    },
    methods: {
        listTutorials() {
            TutorialService.getAll().then(db => {
                this.tutorials=db.data;
            }).catch(err => {
                console.log(err);
            });
        },
        removeAll(){
            TutorialService.deleteAll().then(() => {
                this.tutorials = {};
            }).catch(err => {
                console.log(err)
            });
        },
        deleteItem(item){
            TutorialService.deleteById(item._id).then(() => {
                this.listTutorials();
            }).catch(err => {
                console.log(err);
            });
        },
        setPageNumber(){
            let numberPages = Math.ceil(this.tutorials.length / this.perPage);
            for(let i = 1; i <= numberPages; i++){
                this.pages.push(i);
            }
        },
        getPages(items){
            if(!items){
                return;
            }
            let from = (this.page * this.perPage) - this.perPage;
            let to = (this.page * this.perPage);
            return items.slice(from, to);
        }
    },
    computed: {
        displayPages(){
            return this.getPages(this.tutorials);
        }
    },
    watch: {
        tutorials() {
            this.setPageNumber();
        }
    }
}
</script>