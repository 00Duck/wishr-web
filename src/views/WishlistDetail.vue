<template>
    <div class="wl-container">
        <WLActionBar :id="list.id"></WLActionBar>
        <h1 class="wl-center">{{ list.name }}</h1>
        <p class="wl-center">Created on {{ list.created }}</p>
        <br />
        <div v-for="item in list.items" :key="item.id" class="wl-detail-line">
            <ul>
                <li>
                    <div class="wl-detail-title">{{ item.name }} - <a :href="item.url" target="_blank">Link</a></div>
                    <div class="wl-detail-notes">{{ item.notes }}</div>
                    <div class="wl-get-item theme-primary-bg">Get this item</div> 
                </li>
            </ul>         
            <div>
                <div class="wl-pill">Price: <b>{{ item.price }}</b></div>
                <div class="wl-pill">Quantity: <b>{{ item.quantity }}</b></div>
            </div>
            
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import WLActionBar from '@/components/WLActionBar.vue'

export default {
    components: { WLActionBar },
    setup() {
        let list = ref(
            {
                "name": "Christmas Wishlist 2022",
                "items": [
                { "name": "A fun toy that has rather long text just because I want to see what happens", "url": "https://duckduckgo.com", "price": "$35", "quantity": "1", "notes": "This is a really cool toy I found on the internet!" },
                { "name": "A fun toy", "url": "https://duckduckgo.com", "price": "$35", "quantity": "1", "notes": "This is a really cool toy I found on the internet!" },
                { "name": "A fun toy", "url": "https://duckduckgo.com", "price": "$35", "quantity": "1", "notes": "This is a really cool toy I found on the internet!" },
                ],
                "id": 123,
                "created": "2022-04-05"
            })
        

        return { list }
    }
}
</script>

<style>

    .wl-detail-line {
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 32px;
    }
    .wl-detail-line li {
        list-style: none;
        line-height: 30px;
    }
    .wl-detail-line ul {
        margin: 0;
    }
    .wl-detail-title {
        font-size: 28px;
    }
    .wl-detail-title i {
        display: inline-block;
        margin-bottom: -5px;
        text-indent: 125px;
        
    }
    .wl-detail-notes {
        font-style: italic;
        color: #aaa;
    }
    .wl-pill {
        display: block;
        white-space: nowrap;
        font-size: 20px;
    }
    .wl-get-item {
        color: white;
        display: inline-block;
        padding: 5px 12px;
        border-radius: 10px;
    }
</style>