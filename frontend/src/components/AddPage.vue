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
  name: '',
  price: 0,
})

const cancel = () => {
 router.push({name:'list'})
}

const add = (index: number) => {
  ElMessageBox.confirm(
    '本当に追加しますか?',
    '確認',
    {
      confirmButtonText: '追加する',
      cancelButtonText: 'キャンセル',
      type: 'warning',
      center: true,
    }
  )
    .then(() => {
      console.log('start api call');
      DataApiService.create(form.name,form.price)
        .then(() => {
          router.push({name:'list'})
          ElMessage({
            type: 'success',
            message: '追加が完了しました。',
          })
        })
        .catch((error) => {
          console.log('error_%s',error);
           ElMessage({
            type: 'error',
            message: '追加に失敗しました。',
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
</script>

<template>
    <el-form :model="form">
        <el-form-item label="ID" :label-width="formLabelWidth">
            <el-input :disabled="true" placeholder="自動採番"/>
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
        <el-button type="primary" @click="add">Confirm</el-button>
    </div>
</template>
