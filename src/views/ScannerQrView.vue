<script setup>
    import { ref, onUnmounted } from 'vue';
    import { Html5Qrcode } from "html5-qrcode";
    import QrActions from '@/components/QrActions.vue';
    import { useToast } from 'vue-toastification';

    const scannerQr = ref({
        input: null,
        result: null,
    });

    let scanning = ref(false);
    const result = ref("");

    let html5Qrcode;
    const toast = useToast();
    
    const startScanner = async () => {
        try {
            scanning.value = true;
            html5Qrcode = new Html5Qrcode("reader");
            console.log('starting....')

            await html5Qrcode.start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: 300,
                },
                (decoded) => {
                    result.value = decoded;
                    console.log("QR scanned:", decoded);
                },
                (err) => {
                    console.warn("QR error:", err);
                },
            );
        } catch (e) {
            console.error(e);
        }
    };

    const stopScanner = async () => {
        if (html5Qrcode) {
            await html5Qrcode.stop();
            html5Qrcode.clear();
            scanning.value = false;
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if(file){
            scannerQr.value.input = file
            decodeQRCodeFromImage(file);
            
        } else{
            console.error("No file selected.");
        }
    }
    const decodeQRCodeFromImage = (imgSrc) => {
        html5Qrcode = new Html5Qrcode("scan-result");
        html5Qrcode.scanFile(imgSrc)
        .then(decodedText => {
            // console.log(`Decoded text: ${decodedText}`);
            scannerQr.value.result = decodedText;
            // toast.success('QR code is successfully scanned!');
        })
        .catch(err => {
            console.error(`Error scanning file: ${err}`);
        });
    }

    // Stop the camera when leaving the scanner route
    onUnmounted(() => {
        if (scanning.value) {
            html5Qrcode.stop().catch((err) => console.warn("Error stopping scanner:", err));
        }
    });
</script>
<template>
    <div class="lg:w-2/5 w-full flex justify-center flex-col items-center gap-5">
        <div class="w-full" id="scanner-qr-container">
            <div v-show="scannerQr.result"> 
                <label for="generate-input" class="block text-lg font-medium text-white mb-3">Scan Result</label>
                    <div class="text-[#818cf8] flex justify-center text-xl lg:text-2xl">
                       <a :href="scannerQr.result" target="_blank"> {{ scannerQr.result }} </a>
                </div>
                <div id="scan-result" class="flex justify-center">
                </div>
            </div>
            
            <div id="reader" class="w-full h-[300px]"></div>
            <div v-if="scanning">
                <div class="w-full h-[300px]">

                </div>
                <button @click="stopScanner" class="font-semibold mb-6 bg-red-400 py-1.5 px-3 rounded ">Stop Scanner</button>
                <p class="text-white font-semibold">Result: {{ result }}</p>
            </div>
                
    
                <div class="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                  <div class="text-center flex gap-3 lg:flex-row flex-col lg:w-auto w-full">
                    <button @click="startScanner" type="button" class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" id="generate-qr-action" data-action-qr="camera">Use my camera</button>

                    <label for="qr-upload" class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer" id="scanner-qr-action" data-action-qr="upload">
                        Upload an image
                        <input @change="handleFileUpload" id="qr-upload" name="file-upload" type="file" class="sr-only">
                    </label>
                  </div>
                </div>
        </div>

        <QrActions class="w-full"></QrActions>
    </div>
</template>