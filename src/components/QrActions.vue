<script setup></script>

<template>
    <div class="w-2/5 flex justify-center flex-col items-center gap-5">
        <RouterLink to="/generate" class="text-center rounded-md bg-indigo-500 px-3.5 py-2.5 text-2xl font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 w-full" id="generate-qr-action" data-action="generate">Generate a QR Code</RouterLink>
                
        <RouterLink to="/scanner" class="text-center rounded-md bg-white px-3.5 py-2.5 text-2xl font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 w-full" id="scanner-qr-action" data-action="scanner">Scan a QR Code</RouterLink>
    </div>
</template>