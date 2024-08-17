
<script lang='ts' setup>
import { 
  ref,
} from 'vue'

import { 
    useRouter,
} from 'vue-router'

import {
  Edit,
  Delete,
} from '@element-plus/icons-vue'

import { 
  ElMessage, 
  ElMessageBox,
} from 'element-plus'

import DataApiService from "@/service/DataApiService";

const router = useRouter()

const isLoading = ref(false)
const data = ref([])

const initilize = async () => {
    console.log('initilize')
    return new Promise(async (resolve, reject) => {  
      isLoading.value = true;
      await DataApiService.getAll()
        .then((response) => {
          data.value = response.data.list
          resolve(200);
        })
        .catch((error) => {
          console.log(error)
          data.value = [];
          reject(500);
        })
        .finally(() => {
          isLoading.value = false;
        })
  });
    
}

const deleteData = (index: number) => {
 console.log( data.value[index])
  ElMessageBox.confirm(
    '本当に削除しますか?',
    '確認',
    {
      confirmButtonText: '削除する',
      cancelButtonText: 'キャンセル',
      type: 'warning',
      center: true,
    }
  )
    .then(() => {
      console.log('start api call');
      DataApiService.delete(data.value[index]["item_id"])
        .then(() => {
          initilize();
          ElMessage({
            type: 'success',
            message: '削除が完了しました。',
          })
        })
        .catch((error) => {
          console.log('error_%s',error);
           ElMessage({
            type: 'error',
            message: '削除に失敗しました。',
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

const editData = (index: number) => {
    router.push({ name:'edit',params: { 
            id: data.value[index]["item_id"],
            name: data.value[index]["name"],
            price: data.value[index]["price"]
        }
    })
}

const addData = () => {
    router.push({name:'add'})
}


initilize()
</script>

<template>
 <el-table :data='data' style='width: 100%' max-height='500' v-loading.fullscreen.lock="isLoading">
    <el-table-column fixed prop='item_id' label='ID' width='50' />
    <el-table-column prop='name' label='名称' width='100' />
    <el-table-column prop='price' label='価格' width='100' />
    <el-table-column prop='created_at' label='作成日時' width='200' />
    <el-table-column prop='updated_at' label='更新日時' min-width='200' />
    <el-table-column fixed='right' label='操作' width='120'>
      <template #default='scope'>
        <el-button type='primary' :icon='Edit' circle @click.prevent='editData(scope.$index)'/>
        <el-button type='danger' :icon='Delete' circle @click.prevent='deleteData(scope.$index)'/>
      </template>
    </el-table-column>
  </el-table>
  <el-button class='mt-4' style='width: 100%' @click='addData'>Add Item</el-button>
</template>
