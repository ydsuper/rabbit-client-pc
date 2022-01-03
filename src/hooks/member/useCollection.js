import { ref } from "vue";
import { getCollection } from "@/api/member";

export default function useCollection() {
  // 存储数据
  const collection = ref(null);

  // 请求获取数据 (Mock Data)
  getCollection({ pageSize: 4 }).then((data) => {
    collection.value = data.result;
  });

  return collection;
}
