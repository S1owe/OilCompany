<template>
  <div id="app">
    <div class="oil">
      <h2>Нефтяная компания</h2>

      <div class="addPost">
        <div class="btn_addPost" @click="showAddModal = !showAddModal">Добавить новую запись</div>
      </div>

      <div class="addPostModal" v-if="showAddModal">
        <div class="addPostModalBackground"></div>

        <div class="container">

          <div class="table">
            <input class="itemModal" placeholder="Название" v-model="newPost.title"/>
            <input class="itemModal" placeholder="Описание" v-model="newPost.description" />
            <input class="itemModal" placeholder="Торговая марка" v-model="newPost.mark" />
            <input class="itemModal" placeholder="Производитель" v-model="newPost.vendor" />
            <input class="itemModal" placeholder="Цена" v-model="newPost.price" />
          </div>

          <div class="modal_btn" @click="addItem()">Добавить запись</div>
          <div class="modal_btn close" @click="showAddModal = !showAddModal">Закрыть</div>
        </div>
      </div>

      <div class="search">
        <input v-model="search" placeholder="Введите название..."/>
        <div class="search_btn" @click="searchItems()">Найти</div>
      </div>

      <div class="table">
        <div class="header">
          <div class="itemCont">
            <div class="item" id="title"><a @click="sort('title')">Название</a></div>
            <div class="item" id="description"><a @click="sort('description')">Описание</a></div>
            <div class="item" id="mark"><a @click="sort('mark')">Марка</a></div>
            <div class="item" id="vendor"><a @click="sort('vendor')">Производитель</a></div>
            <div class="item" id="price"><a @click="sort('price')">Цена</a></div>
          </div>
          <div class="move">Действие</div>
        </div>

        <div class="row" v-for="(item, i) in oil" :key="'row_' + i">

          <div class="itemCont" v-if="!item.checkEdit">
            <div class="item"><a>{{item.title}}</a></div>
            <div class="item"><a>{{item.description}}</a></div>
            <div class="item"><a>{{item.mark}}</a></div>
            <div class="item"><a>{{item.vendor}}</a></div>
            <div class="item"><a>{{item.price}}</a></div>
          </div>

          <div class="itemCont" v-else>
            <div class="item"><textarea :id="'textarea_title_' + item.id">{{item.title}}</textarea></div>
            <div class="item"><textarea :id="'textarea_description_' + item.id">{{item.description}}</textarea></div>
            <div class="item"><textarea :id="'textarea_mark_' + item.id">{{item.mark}}</textarea></div>
            <div class="item"><textarea :id="'textarea_vendor_' + item.id">{{item.vendor}}</textarea></div>
            <div class="item"><textarea :id="'textarea_price_' + item.id">{{item.price}}</textarea></div>
          </div>

          <div class="move">
            <div class="remove" v-if="!item.checkEdit" @click="deleteEl(i, item.id)">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="48"><g data-name="Layer 17" id="Layer_17"><path class="cls-1" d="M24,31H8a3,3,0,0,1-3-3V9A1,1,0,0,1,7,9V28a1,1,0,0,0,1,1H24a1,1,0,0,0,1-1V9a1,1,0,0,1,2,0V28A3,3,0,0,1,24,31Z"/><path class="cls-1" d="M28,7H4A1,1,0,0,1,4,5H28a1,1,0,0,1,0,2Z"/><path class="cls-1" d="M20,7a1,1,0,0,1-1-1V3H13V6a1,1,0,0,1-2,0V2a1,1,0,0,1,1-1h8a1,1,0,0,1,1,1V6A1,1,0,0,1,20,7Z"/><path class="cls-1" d="M16,26a1,1,0,0,1-1-1V11a1,1,0,0,1,2,0V25A1,1,0,0,1,16,26Z"/><path class="cls-1" d="M21,24a1,1,0,0,1-1-1V13a1,1,0,0,1,2,0V23A1,1,0,0,1,21,24Z"/><path class="cls-1" d="M11,24a1,1,0,0,1-1-1V13a1,1,0,0,1,2,0V23A1,1,0,0,1,11,24Z"/></g></svg>
            </div>
            <div class="edit" v-if="!item.checkEdit" @click="item.checkEdit = true">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="48"><g data-name="Layer 18" id="Layer_18"><path class="cls-1" d="M2,31a1,1,0,0,1-1-1.11l.9-8.17a1,1,0,0,1,.29-.6L21.27,2.05a3.56,3.56,0,0,1,5.05,0L30,5.68a3.56,3.56,0,0,1,0,5.05L10.88,29.8a1,1,0,0,1-.6.29L2.11,31Zm8.17-1.91h0ZM3.86,22.28l-.73,6.59,6.59-.73L28.54,9.31a1.58,1.58,0,0,0,0-2.22L24.91,3.46a1.58,1.58,0,0,0-2.22,0Z"/><path class="cls-1" d="M26.52,13.74a1,1,0,0,1-.7-.29L18.55,6.18A1,1,0,0,1,20,4.77L27.23,12a1,1,0,0,1,0,1.41A1,1,0,0,1,26.52,13.74Z"/><rect class="cls-1" height="2" transform="translate(-7.91 15.47) rotate(-45)" width="12.84" x="8.29" y="16.28"/></g></svg>
            </div>
            <div class="save" v-if="item.checkEdit" @click="save(item, i)">
              <svg height="48" id="svg8" version="1.1" viewBox="0 0 12.7 12.7" width="48" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><defs id="defs2"/><g id="layer1" transform="translate(0,-284.29998)"><path d="m 9.5250005,287.47496 -3.8805557,3.88056 -2.4694446,-2.46944 -1.0583334,1.05835 3.5291668,3.52776 4.9375004,-4.93888 z" id="path4483" style="color:#000000;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;font-variant-ligatures:normal;font-variant-position:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-alternates:normal;font-feature-settings:normal;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000000;letter-spacing:normal;word-spacing:normal;text-transform:none;writing-mode:lr-tb;direction:ltr;text-orientation:mixed;dominant-baseline:auto;baseline-shift:baseline;text-anchor:start;white-space:normal;shape-padding:0;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;opacity:1;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#000000;solid-opacity:1;vector-effect:none;fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.41111124;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate"/></g></svg>
            </div>
          </div>

        </div>
      </div>


    </div>
  </div>
</template>

<script>

import axios from 'axios';
import qs from 'qs';

export default {
    name: 'app',

    data () {
      return {
          oil: [
            /*  {id: 1, title: 'title1', description: 'Длинное описание длинное описание длинное описание', mark: 'Тество', vendor: 'ООО техно +', price: 12000, checkEdit: false},
              {id: 2, title: 'title2', description: 'Длинное описание длинное описание длинное описание длинное описание2 длинное описание2', mark: 'Марка 2', vendor: 'ООО риптест', price: 6000, checkEdit: false},  */
          ],

          newPost: {
              title: '',
              description: '',
              mark: '',
              vendor: '',
              price: ''
          },

          showAddModal: false,
          sortASC: true,
          sortBy: '',
          search: '',
      }
    },


    beforeCreate() {

    },

    created() {
        this.getAllItems();
    },

    mounted() {

    },

    methods: {
        getAllItems() {
            this.oil = [];

            axios
                .get('http://localhost:3000?type=allArticle')
                .then(response => {
                    let data = response.data;
                    console.log(data);

                    for (let i = 0; i < data.length; i++) {
                        this.oil.push({id: data[i].id, title: data[i].title, description: data[i].description, mark: data[i].mark, vendor: data[i].vendor, price: data[i].price, checkEdit: false});
                    }
                })
                .catch(error => console.log(error));
        },

        save(item, i) {

            let id = item.id;
            let title = document.getElementById('textarea_title_' + id).value;
            let description = document.getElementById('textarea_description_' + id).value;
            let mark = document.getElementById('textarea_mark_' + id).value;
            let vendor = document.getElementById('textarea_vendor_' + id).value;
            let price = document.getElementById('textarea_price_' + id).value;
            this.oil[i].title = title;
            this.oil[i].description = description;
            this.oil[i].mark = mark;
            this.oil[i].vendor = vendor;
            this.oil[i].price = price;

            this.oil[i].checkEdit = false;

            let dataTo = {
                type: 'editPost',
                id: id,
                title: title,
                description: description,
                mark: mark,
                vendor: vendor,
                price: price,
            };
            console.log('addItem');
            axios({url: 'http://localhost:3000', data: qs.stringify(dataTo), method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' } })
                .then(resp => {
                    console.log(resp);
                    this.getAllItems();
                })
                .catch(err => {
                    console.log('AUTH Error');
                    console.log(err);
                    this.getAllItems();
                })
        },

        deleteEl(position, id) {
            this.oil.splice(position, 1);

            axios
                .get('http://localhost:3000?type=deleteItem&id=' + id)
                .then(response => {
                    let data = response.data;
                    console.log('удалено');
                })
                .catch(error => console.log(error));
        },

        addItem() {
            this.showAddModal = !this.showAddModal;

            let dataTo = {
                type: 'addPost',
                title: this.newPost.title,
                description: this.newPost.description,
                mark: this.newPost.mark,
                vendor: this.newPost.vendor,
                price: this.newPost.price,
            };
            console.log('addItem');
            axios({url: 'http://localhost:3000', data: qs.stringify(dataTo), method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' } })
                .then(resp => {
                    console.log(resp);
                    this.getAllItems();
                })
                .catch(err => {
                    console.log('AUTH Error');
                    console.log(err);
                    this.getAllItems();
                })
        },

        searchItems() {
            axios
                .get('http://localhost:3000?type=searchArticle&title=' + this.search)
                .then(response => {
                    this.oil = [];

                    let data = response.data;

                    for (let i = 0; i < data.length; i++) {
                        this.oil.push({id: data[i].id, title: data[i].title, description: data[i].description, mark: data[i].mark, vendor: data[i].vendor, price: data[i].price, checkEdit: false});
                    }
                })
                .catch(error => console.log(error));
        },

        sort(params) {

            document.getElementById('title').style.color = '#000';
            document.getElementById('description').style.color = '#000';
            document.getElementById('mark').style.color = '#000';
            document.getElementById('vendor').style.color = '#000';
            document.getElementById('price').style.color = '#000';


            switch (params) {
                case 'title':
                    document.getElementById('title').style.color = '#0098ea';
                    break;

                case 'description':
                    document.getElementById('description').style.color = '#0098ea';
                    break;

                case 'mark':
                    document.getElementById('mark').style.color = '#0098ea';
                    break;

                case 'vendor':
                    document.getElementById('vendor').style.color = '#0098ea';
                    break;

                case 'price':
                    document.getElementById('price').style.color = '#0098ea';
                    break;
            }

            if (this.sortBy !== params) {
                this.sortBy = params;
                this.sortASC = true;
            } else {
                this.sortASC = !this.sortASC;
            }


            let sort = 'asc';

            if (!this.sortASC) {
                sort = 'desc'
            }

            axios
                .get('http://localhost:3000?type=sortArticle&field=' + params + '&order=' + sort)
                .then(response => {
                    this.oil = [];

                    let data = response.data;

                    for (let i = 0; i < data.length; i++) {
                        this.oil.push({id: data[i].id, title: data[i].title, description: data[i].description, mark: data[i].mark, vendor: data[i].vendor, price: data[i].price, checkEdit: false});
                    }
                })
                .catch(error => console.log(error));
        }
    },
}

</script>

<style lang="scss">

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    display: flex;
    justify-content: center;
    margin-top: 60px;
  }

  .addPost {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;

    .btn_addPost {
      height: 34px;
      padding: 0 20px;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #d7d7d7;
      color: #afafaf;
      cursor: pointer;
      transition: 0.5s ease;
    }

    .btn_addPost:hover {
      border: 2px solid #000;
      color: #000;
    }
  }

  .search {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;

    input {
      height: 34px;
      width: 400px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      margin-right: 20px;
      font-size: 16px;
      border: 2px solid #d7d7d7;
      color: black;
    }

    .search_btn {
      height: 34px;
      padding: 0 20px;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #d7d7d7;
      color: #afafaf;
      cursor: pointer;
      transition: 0.5s ease;
    }

    .search_btn:hover {
      border: 2px solid #000;
      color: #000;
    }


  }

  .oil {
    display: flex;
    flex-direction: column;
    justify-content: center;

    h2 {
      margin: 0 0 40px 0;
      font-size: 32px;
      text-align: center;
    }

    .table {
      width: 80vw;
      display: flex;
      flex-direction: column;
      border: 2px solid #d7d7d7;
      padding: 30px;
      margin-bottom: 100px;

      .header {
        padding: 0 0 30px 0;
        font-size: 16px;
      }

      .header, .row {
        display: flex;
        flex-direction: row;
      }

      .header .item a:hover {
        cursor: pointer;
        text-decoration: underline;
      }

      .row {
        font-size: 16px;
        padding: 10px 0;
        border-top: 1px solid #ebebeb;
      }

      .itemCont {
        display: flex;
        flex-direction: row;
        width: 90%;

        textarea {
          width: 100%;
          height: 200px;
        }
        
      }

      .item {
        display: flex;
        align-items: center;
        flex-direction: row;
        padding-right: 20px;
      }

      .item:nth-child(1) {
        width: 15%;
      }

      .item:nth-child(2) {
        width: 35%;
      }

      .item:nth-child(3) {
        width: 15%;
      }

      .item:nth-child(4) {
        width: 15%;
      }

      .item:nth-child(5) {
        width: 10%;
      }

      .item:nth-child(6) {
        width: 10%;
      }

      .move {
        display: flex;
        align-items: center;
        flex-direction: row;
        padding-right: 20px;
        width: 10%;
      }

      .remove, .edit, .save {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 32px;
        min-height: 32px;
        border-radius: 5px;
        border: 2px solid black;
        cursor: pointer;
        transition: 0.5s ease;
        margin-right: 10px;

        svg {
          width: 24px;
          height: 24px;
          transition: 0.5s ease;

          path {
            transition: 0.5s ease;
          }
        }
      }

      .edit:hover {
        background: rgb(0, 152, 234);
      }

      .remove:hover {
        background: rgb(255, 31, 46);

      }

      .save:hover {
        background: rgb(83, 234, 0);
      }
    }
  }

  .addPostModal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.71);
    display: flex;
    align-items: center;
    justify-content: center;

    .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 40px;
      border-radius: 20px;
      background-color: white;
      width: 800px;
    }

    .table {
      display: flex;
      flex-direction: column;
      border: none;
      width: 90%;
      margin-bottom: 0;

      input {
        height: 40px;
        width: 100%;
        font-size: 16px;
        border: 2px solid #d7d7d7;
        color: black;
        margin-bottom: 10px;
        padding: 0 10px;
      }
      
    }

    .modal_btn {
      height: 34px;
      padding: 0 20px;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #a5a5a5;
      color: #7d7d7d;
      cursor: pointer;
      transition: 0.5s ease;
    }

    .modal_btn:hover {
      border: 2px solid #000;
      color: #000;
    }

    .close {
      margin-top: 20px;
    }

  }


</style>
