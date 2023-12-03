<template>
  <div class="image-index">
    <div class="file-upload">
      <label>File
        <input type="file" @change="handleFileUpload( $event )"/>
      </label>
        <button v-on:click="submitImage()">Upload</button>
    </div>
    <table class="image-index-table">
      <thead>
        <tr>
          <th>#</th>
          <th>filename</th>
          <th>status</th>
          <th>uploaded by</th>
          <th colspan="3">downloads</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(image,i) in images" :key="i">
           <td>{{ image.id }}</td>
           <td>{{ image.filename }}</td>  
           <td>{{ image.status }}</td> 
           <td>{{ image.user.username }}</td> 
           <td v-if="image.status == 'complete'"><a v-on:click="download(image.id)">original</a></td>
           <td v-if="image.status == 'complete'"><a v-on:click="mutate(image.id, resize_params)">resize</a></td>
           <td v-if="image.status == 'complete'"><a v-on:click="mutate(image.id, rotate_params)">rotate</a></td>
        </tr>
       </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'ImageIndexView',
  components: {},
  data() {
    return {
      images:[],
      file: '',
      resize_params: {
        transformation: "resize",
        width: "1280",
        height: "720",
      },
      rotate_params: {
        transformation: "rotate",
        angle: "180"
      }
    }
  },
  methods: {
    download(id) {
      axios.get(`http://localhost:3000/images/${id}`).then((response) => {
        var url = response.data.download_url
        window.open(url, '_blank').focus();
      }).catch((error) => {
        console.log(error, id)
      })
    },
    mutate(id, options) {
      console.log(id, options)
      axios.get(`http://localhost:3000/images/${id}/mutate`, { params: options }).then((response) => {
        var url = response.data.image_url
        window.open(url, '_blank').focus();
      }).catch((error) => {
        console.log(error, id)
      })
    },
    submitImage() {
      let formData = new FormData();
      formData.append('blob', this.file);

      //perform post
      axios.post('http://localhost:3000/images/',
          formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then((response) => {
          this.file = ''
          var image = response.data.data
          image.user = {
            user_id: localStorage.getItem("user_id"),
            username: localStorage.getItem("user_name")
          }
          this.images.push(image)
      }).catch((error) => {
        console.log(error)
      });
    },
    handleFileUpload( event ){
      this.file = event.target.files[0];
    },
  },
  mounted() {
    axios.get('http://localhost:3000/images').then(response => {
      this.images = response.data;
    }).catch((error) => {
      if (error.response) {
        console.log('unauthorized access')
      } else {
        console.log('Error', error.message)
      }
    });
  },
}
</script>

<style>
.image-index-table {
  width: 70%;
  margin: auto;
}

.image-index-table thead{
  background-color: #668f99
}

.image-index-table tr:nth-of-type(even) {
  background-color: 		#f2f2f2
}
</style>

