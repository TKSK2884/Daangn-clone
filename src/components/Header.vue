<template>
    <div :class="[$style.mainContainer, 'general-background-color']">
        <div :class="$style.nav">
            <div :class="[$style.container, $style.left]">
                <div :class="$style.logoBox">
                    <router-link :to="'/'"
                        ><div :class="$style.logo"></div
                    ></router-link>
                </div>
                <div :class="[$style.linkBox, 'general-text-color']">
                    <router-link :to="'/'"><div>중고거래</div> </router-link>
                    <router-link :to="'/kr/job'"><div>알바</div></router-link>
                    <router-link :to="'/kr/realty'"
                        ><div>부동산 직거래</div></router-link
                    >
                </div>
            </div>
            <div :class="[$style.container, $style.right]">
                <div :class="$style.inputBox">
                    <input
                        type="text"
                        :class="$style.input"
                        v-model="keyword"
                        v-on:keyup.enter="searchKeyword(keyword)"
                        placeholder="물품이나 동네를 검색해보세요"
                    />
                    <div :class="[$style.button, 'text-color']">채팅하기</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
    components: {},
})
export default class Header extends Vue {
    keyword: string = "";

    searchKeyword(search: string) {
        if (this.keyword !== "") {
            this.$router.push({
                name: "search",
                query: {
                    search: search,
                },
            });
            this.keyword = "";
        } else {
            return {};
        }
    }
}
</script>

<style lang="scss" module>
@import "@/assets/utils.scss";
.mainContainer {
    width: 100%;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 30;

    color: black;

    .nav {
        max-width: 1200px;
        height: 64px;

        padding: 12px 16px;

        display: flex;

        @include setCenter;

        .container {
            width: 50%;

            display: flex;
            align-items: center;

            .logoBox {
                margin-right: 40px;

                .logo {
                    width: 100px;
                    height: 28px;

                    background-image: url("@/assets/logo.svg");
                }
            }

            .linkBox {
                display: flex;

                font-size: 18px;
                font-weight: bold;

                a {
                    text-decoration: none;
                }

                div {
                    margin-right: 30px;
                }
            }

            .inputBox {
                height: 40px;

                display: flex;

                .input {
                    width: 280px;

                    padding: 10px;
                    margin-right: 20px;

                    font-size: 16px;

                    border-radius: 6px;

                    background-color: #f2f3f6;

                    outline: none;
                }

                .button {
                    width: 90px;

                    padding-top: 6px;
                    padding-bottom: 6px;

                    font-weight: bold;

                    text-align: center;

                    border: 1px solid #d1d3d8;
                }
            }
        }

        .right {
            justify-content: right;
        }
    }
}
</style>

<style lang="scss">
.router-link-exact-active.router-link-active {
    div {
        color: #ff6e1d;
    }
}
</style>
