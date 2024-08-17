<script lang="ts" setup>
import { 
    reactive,
} from 'vue';

import { 
  ElMessage, 
  ElMessageBox,
} from 'element-plus'

import { 
    useRouter,
} from 'vue-router'

import DataApiService from "@/service/DataApiService";

const router = useRouter()

const formLabelWidth = '120px'
const form = reactive({
  id: 0,
  name: '',
  price: 0,
})

const cancel = () => {
 router.push({name:'list'})
}

const edit = () => {
  ElMessageBox.confirm(
    '本当に更新しますか?',
    '確認',
    {
      confirmButtonText: '更新する',
      cancelButtonText: 'キャンセル',
      type: 'warning',
      center: true,
    }
  )
    .then(() => {
      console.log('start api call');
      DataApiService.update(form.id,form.name,form.price)
        .then(() => {
          router.push({name:'list'})
          ElMessage({
            type: 'success',
            message: '更新が完了しました。',
          })
        })
        .catch((error) => {
          console.log('error_%s',error);
           ElMessage({
            type: 'error',
            message: '更新に失敗しました。',
          })
        });  
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '中止しました。',
      })
    })
}




const props = defineProps({
  id: Number,
  name: String,
  price: Number
})

const initilize = () => {
    if(props.id === undefined) {
        router.push({name:'list'})
        ElMessage({
            type: 'error',
            message: '情報の取得に失敗しました。',
        })
    } else {
        form.id = props.id;
        form.name = props.name == undefined ? '' : props.name;
        form.price = props.price == undefined ? 0 : props.price;
    }
}

initilize();
</script>


<template>
    <el-form :model="form">
        <el-form-item label="ID" :label-width="formLabelWidth">
            <el-input v-model="form.id" :disabled="true"/>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="価格" :label-width="formLabelWidth">
            <el-input v-model="form.price" autocomplete="off" />
        </el-form-item>
    </el-form>
    <div class="dialog-footer">
        <el-button @click="cancel">Cancel</el-button>
        <el-button type="primary" @click="edit">Confirm</el-button>
    </div>
</template>
