<template>
    <div class="wl-hb">
        <div class="theme-primary-bg"><i :class="icon_name"></i></div>
        <h2>{{ title }}</h2>
    </div>
    
</template>
<script>

export default {
    props: ['title', 'icon_name'],
    setup() {
    }
}
</script>
<style>
.wl-hb {
    position: relative;
    z-index: 1;
    background-color: #FFF;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 20px;
    border-radius: 5px;
    margin-bottom: 40px;
    align-items: center;

    & > div {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        padding: 10px 0px;
        width: 80px;

        & > i {
            display: flex;
            font-size: 3rem;
            justify-content: center;
            align-items: center;
            height: 100%;
            color: #FFF;
        }
    }
    & > h2 {
        color: #2e3742;
        margin-bottom: 0rem;
    }

}
</style>