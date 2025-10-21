<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black opacity-60"></div>
  <div
    class="absolute top-1/2 left-1/2 w-5/6 h-auto max-h-150 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg overflow-y-auto"
  >
    <div class="flex justify-between mb-4">
      <p class="font-bold text-xl">{{ openTicketData?.name || 'New Ticket' }}</p>
      <span class="cursor-pointer" @click="usePopup.closePopup()">X</span>
    </div>
    <div v-if="openTicketData">
      <div class="flex inline-flex mb-3">
        <div class="mr-4">
          <select
            id="priority"
            v-model="openTicketData.priority"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Choose priority</option>
            <option v-for="option in PRIORITY_OPTIONS" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <div class="mr-4">
          <select
            id="partner"
            v-model="openTicketData.partner"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Choose partner</option>
            <option v-for="option in PARTNER_OPTIONS" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <div>
          <select
            id="status"
            v-model="openTicketData.status"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option v-for="option in STATUS_OPTIONS" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
      </div>
      <div>
        <textarea
          id="description"
          class="w-full min-h-30 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          v-model="openTicketData.description"
          placeholder="Start to type here..."
        ></textarea>
      </div>

      <div class="mb-3">
        <div v-if="openTicketData.detail_description">
          <div
            v-for="(item, index) in openTicketData.detail_description"
            class="flex items-start gap-2 mb-2"
          >
            <div class="w-[100px] flex-shrink-0">
              <textarea
                :id="'detailPhotoId-' + index"
                class="w-full h-9 px-2 py-1 border border-gray-300 rounded-lg resize-none overflow-hidden"
                v-model="item.photo_id"
                maxlength="9"
                placeholder="Photo ID"
              ></textarea>
            </div>

            <div class="w-[60px] flex-shrink-0 flex flex-col items-center mr-2">
              <div class="relative mb-1" v-for="(styleItem, styleIndex) in item.style">
                <textarea
                  :id="'detailStyle-' + styleIndex"
                  class="w-12 h-9 px-2 py-1 border border-gray-300 rounded-lg resize-none overflow-hidden"
                  v-model="item.style[styleIndex]"
                  maxlength="3"
                  placeholder="Style"
                ></textarea>
                <button
                  @click="item.style.splice(styleIndex, 1)"
                  class="absolute top-0 right-[-14px] text-red-500 hover:text-red-700 cursor-pointer"
                >
                  ×
                </button>
              </div>
              <span
                @click="item.style.push('')"
                class="text-gray-500 cursor-pointer p-1 hover:text-blue-500"
                >+</span
              >
            </div>

            <div class="flex-1">
              <textarea
                :id="'detailDescription-' + index"
                class="w-full h-20 px-2 py-1 border border-gray-300 rounded-lg resize-none"
                v-model="item.text"
                maxlength="100"
                placeholder="Description"
              ></textarea>
            </div>

            <button
              @click="openTicketData.detail_description.splice(index, 1)"
              class="text-red-500 cursor-pointer hover:text-red-700 px-2"
            >
              x
            </button>
          </div>
        </div>

        <div>
          <button
            @click="openTicketData.detail_description.push({ photo_id: 0, style: [], text: '' })"
            class="bg-transparent border-solid border text-gray-500 cursor-pointer p-2 hover:text-blue-500 rounded-lg"
          >
            Add a new line
          </button>
        </div>
      </div>

      <div class="flex justify-between">
        <button
          @click="sentToPartner"
          :disabled="openTicketData.isSentToPartner"
          class="px-4 py-2 rounded-lg text-white transition bg-gray-900 hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
        >
          {{ openTicketData.isSentToPartner ? 'Has been send' : 'Sent' }}
        </button>

        <button
          v-if="appStore.role === 'Manager'"
          @click="toggleApprove"
          class="px-4 py-2 rounded-lg text-white transition bg-red-800 hover:bg-gray-700 cursor-pointer"
        >
          {{ openTicketData.isApprouve ? 'Disapprove' : 'Approve' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useTicketStore, usePopupStore } from '@/stores/ticketPinia.ts'
import { useAppStore } from '@/stores/appStore.ts'
import {
  PARTNER_OPTIONS,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
} from '../../configs/fetchingDataTypes.ts'

const usePopup = usePopupStore()
const ticketData = useTicketStore()
const appStore = useAppStore()

const openTicketData = computed(() =>
  ticketData.tickets.find((item) => item.id === usePopup.currentOpenTicketId),
)

watch(
  openTicketData,
  (newValue) => {
    ticketData.setUpdatedData(newValue?.id, newValue)
  },
  { deep: true },
)

const toggleApprove = async () => {
  const currentId = openTicketData.value?.id as number
  const currentValue = openTicketData?.value?.isApprouve
  const toggleStatus = currentValue ? 'Pending' : 'Completed'
  await ticketData.setUpdatedData(
    currentId,
    { isApprouve: !currentValue, status: toggleStatus },
    true,
  )
}

const sentToPartner = async () => {
  const currentId = openTicketData.value?.id as number
  await ticketData.setUpdatedData(currentId, { isSentToPartner: true, status: 'Sent' }, true)

  // imitation of the progress
  simulateProgress(currentId)
}

function simulateProgress(id: number): void {
  setTimeout(() => {
    ticketData.setUpdatedData(id, { status: 'In Progress' }, true)
    setTimeout(() => {
      ticketData.setUpdatedData(id, { status: 'Completed' }, true)
    }, 5000)
  }, 5000)
}
</script>
