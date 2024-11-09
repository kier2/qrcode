<script setup>
    import QRCode from 'qrcode';
    import { reactive, ref } from 'vue';
    import QrActions from '@/components/QrActions.vue';
    // import { useToast } from 'vue-toastification';

    const form = reactive({
        qr: ''
    });

    const qrImgSrc = ref(''); 
    // const toast = useToast();

    const generateQr = async () => {
        try{
            qrImgSrc.value = await QRCode.toDataURL(form.qr);
            form.qr = '';
            // toast.success('QR code is successfully generated!');
        } catch (error) {
            // Uncomment this to enable for debugging
            console.error('Input empty!', error);
            // toast.error('Unable to generate.');
        }
    }
</script>
<template>
    <div class="lg:w-2/5 py-4 lg:py-0 w-full flex justify-center flex-col items-center gap-5">
        <div class="w-full" id="generate-qr-container" >
            <form @submit.prevent="generateQr">
                <div>
                    <label for="generate-input" class="block text-lg font-medium text-white">Generate a QR Code</label>
                    <div class="relative mt-2 flex items-center flex-col lg:flex-row">
                        <input v-model="form.qr" type="url" name="input-scanner" id="generate-input" class="block w-full rounded-md border-0 py-3 pl-2 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" placeholder="https://">
                        <div class="lg:right-0 flex py-1.5 lg:pr-1.5 lg:absolute lg:inset-y-0 w-full lg:w-auto">
                            <button type="submit" class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 w-full md:py-0" id="generate-qr-btn">Generate QR</button>
                        </div>
                    </div>
                </div>
            </form>

            <div class="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                <div class="text-center overflow-hidden">
                    <div v-if="qrImgSrc">
                        <img 
                        :src="qrImgSrc"
                        class="mx-auto w-full h-64 object-cover" 
                        id="generate-qr-img"
                        alt="Generated QR Code" />
                        <a id="download-qr" :href="qrImgSrc" download>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white text-center mx-auto mt-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                        </a>
                    </div>

                    <svg v-else class="mx-auto h-60 w-20 text-gray-500" id="generate-qr-placeholder" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
        </div>

        <QrActions class="w-full"></QrActions>
    </div>
</template>