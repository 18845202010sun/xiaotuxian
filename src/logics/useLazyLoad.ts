type apiFunction = () => Promise<void>;
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
export default function useLazyLoad(apiFunction: apiFunction) {
  const target = ref<HTMLElement>();
  const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      stop();
      apiFunction();
    }
  },{threshold:0});
  return target;
}