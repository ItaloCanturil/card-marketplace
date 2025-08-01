<script setup lang="ts">
  import { ref, toRefs, watch, type PropType } from 'vue';


  const props = defineProps({
    placeholder: {
      type: String,
      default: 'Search'
    },
    items: {
      type: Array as PropType<object[]>,
      required: true
    },
    searchKeys: {
      type: Array as PropType<string[]>,
      required: true
    }
  })

  const emit = defineEmits(['update:filtered-items']);

  const searchQuery = ref('');
  const { items, searchKeys } = toRefs(props);

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  watch(
    [searchQuery, items],
    ([newQuery]) => {
      if (!newQuery) {
        emit('update:filtered-items', items.value);
        return;
      }

      const lowerCaseQuery = newQuery.toLowerCase();

      const filtered = items.value.filter((item) => {
        return searchKeys.value.some((key) => {
          const value = getNestedValue(item, key);

          if (Array.isArray(value)) {
            return value.some(subItem => {
              const nestedValue = getNestedValue(subItem, key);
              return nestedValue && String(nestedValue).toLowerCase().includes(lowerCaseQuery);
            })
          }

          return value && String(value).toLowerCase().includes(lowerCaseQuery);
        })
      })

      emit('update:filtered-items', filtered);
    },
    {
      immediate: true
    }
  )
</script>

<template>
  <div class="flex items-center gap-4 w-full justify-end px-4">
    <label class="input">
      <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input type="search" className="grow" :placeholder="placeholder" v-model="searchQuery" />
      <kbd className="kbd kbd-sm">⌘</kbd>
      <kbd className="kbd kbd-sm">K</kbd>
    </label>
  </div>
</template>