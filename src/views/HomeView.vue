<template>
    <div :class="$style.mainContainer">
        <div :class="[$style.container, $style.first]">
            <div :class="$style.coverBox">
                <div :class="$style.box">
                    <div :class="$style.boldText">
                        당신 근처의<br />당근마켓
                    </div>
                    <div :class="$style.text">
                        중고 거래부터 동네 정보까지, 이웃과 함께해요.<br />
                        가깝고 따뜻한 당신의 근처를 만들어요.
                    </div>
                </div>
                <div :class="$style.imageBox">
                    <div :class="$style.image"></div>
                </div>
            </div>
        </div>
        <div :class="[$style.container, $style.second]">
            <div :class="$style.coverBox">
                <div :class="$style.imageBox">
                    <div :class="$style.image"></div>
                </div>

                <div :class="[$style.box, $style.rightBox]">
                    <div :class="$style.boldText">
                        우리 동네<br />중고 직거래 마켓
                    </div>
                    <div :class="$style.text">
                        동네 주민들과 가깝고 따뜻한 거래를 지금 경험해보세요.
                    </div>
                    <div :class="$style.buttonBox">
                        <router-link :to="'/hot_articles'"
                            ><div :class="$style.button">
                                인기매물 보기
                            </div></router-link
                        >
                        <div :class="$style.button">믿을 수 있는 중고거래</div>
                    </div>
                </div>
            </div>
        </div>
        <div :class="[$style.container, $style.third]">
            <div :class="$style.coverBox">
                <div :class="$style.box">
                    <div :class="$style.boldText">
                        이웃과 함께 하는<br />동네생활
                    </div>
                    <div :class="$style.text">
                        우리 동네의 다양한 이야기를 이웃과 함께 나누어요.
                    </div>
                    <div :class="$style.storyBox">
                        <div :class="$style.story">
                            <div
                                :class="[$style.logo, $style.storyLogo1]"
                            ></div>
                            <div
                                :class="[$style.boldText, $style.storyBoldText]"
                            >
                                우리동네질문
                            </div>
                            <div :class="$style.text">
                                궁금한 게 있을 땐 이<br />웃에게 물어보세요.
                            </div>
                        </div>
                        <div :class="$style.story">
                            <div
                                :class="[$style.logo, $style.storyLogo2]"
                            ></div>
                            <div :class="$style.boldText">동네분실센터</div>
                            <div :class="$style.text">
                                무언가를 잃어버렸을<br />
                                때, 함께 찾을 수 있어요.
                            </div>
                        </div>
                        <div :class="$style.story">
                            <div
                                :class="[$style.logo, $style.storyLogo3]"
                            ></div>
                            <div :class="$style.boldText">동네모임</div>
                            <div :class="$style.text">
                                관심사가 비슷한 이웃과<br />
                                온오프라인으로 만나요.
                            </div>
                        </div>
                    </div>
                </div>
                <div :class="$style.imageBox">
                    <div :class="$style.image"></div>
                </div>
            </div>
        </div>
        <div :class="[$style.container, $style.four]">
            <div :class="$style.coverBox">
                <div :class="$style.imageBox">
                    <div :class="$style.image"></div>
                </div>
                <div :class="[$style.box, $style.rightBox2]">
                    <div :class="$style.boldText">
                        내 근처에서 찾는<br />동네가게
                    </div>
                    <div :class="$style.text">
                        우리 동네 가게를 찾고 있나요?<br />
                        동네 주민이 남긴 진짜 후기를 함께 확인해보세요!
                    </div>
                    <div :class="$style.buttonBox">
                        <div :class="[$style.button, $style.homeButton]">
                            당근마켓 동네가게 찾기
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div :class="$style.productContainer">
            <div :class="$style.title">중고거래 인기매물</div>

            <ProductsContainer />
            <div :class="$style.button">
                <router-link :to="'/hot_articles'"
                    >인기매물 더 보기</router-link
                >
            </div>
        </div>
        <div :class="$style.keywordContainer">
            <div :class="$style.title">
                <router-link :to="`/top_keywords`"
                    >중고거래 인기검색어</router-link
                >
            </div>
            <div :class="$style.keyword">
                <div v-for="(keyword, index) in daangnArray" :key="index">
                    <div :class="$style.name">
                        <router-link :to="`/search?=${keyword.name}`">
                            {{ keyword.name }}</router-link
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ProductsContainer from "@/components/ProductsContainer.vue";
import daangnList from "@/assets/daangnlinks.json";
import { Keywords } from "@/structure/types";

@Component({
    components: {
        ProductsContainer,
    },
})
export default class HomeView extends Vue {
    daangnArray: Keywords[] = [];

    mounted() {
        this.$store.commit("setDarkMode", false);
        this.daangnArray = daangnList.keywords as Keywords[];

        this.transDaangnArray();
    }

    transDaangnArray() {
        let transedDaangnArray: Keywords[] = [];

        for (
            let i: number = 0;
            i < Math.min(10, this.daangnArray.length);
            i++
        ) {
            transedDaangnArray[i] = this.daangnArray[i];
        }

        this.daangnArray = transedDaangnArray;
    }
}
</script>

<style lang="scss" module>
@import "@/assets/utils.scss";

.mainContainer {
    .container {
        width: 100%;
        height: 760px;

        .coverBox {
            max-width: 1024px;
            height: 100%;

            position: relative;

            display: flex;
            align-items: center;

            @include setCenter;

            .box {
                padding-bottom: 20px;

                .boldText {
                    font-size: 40px;
                    font-weight: bold;

                    padding-bottom: 20px;
                }

                .text {
                    font-size: 16px;
                }

                .buttonBox {
                    display: flex;

                    a {
                        text-decoration: none;

                        color: #212529;
                    }

                    .button {
                        padding: 16px;
                        margin-top: 20px;
                        margin-right: 20px;

                        font-size: 18px;
                        font-weight: bold;

                        border: 1px none black;

                        border-radius: 5px;

                        background-color: #f1f3f5;
                    }

                    .homeButton {
                        width: 230px;

                        margin-top: 30px;

                        text-align: center;
                    }
                }
                .storyBox {
                    display: flex;

                    padding-top: 30px;

                    .story {
                        padding-right: 30px;
                        .logo {
                            width: 55px;
                            height: 55px;

                            margin-top: 20px;
                            margin-bottom: 20px;

                            background-size: cover;
                            background-repeat: no-repeat;
                            background-position: center center;
                        }

                        .boldText {
                            font-size: 14px;
                            font-weight: bold;

                            padding-bottom: 10px;
                        }

                        .text {
                            font-size: 12px;
                        }

                        .storyBoldText {
                            margin-top: 20px;
                        }

                        .storyLogo1 {
                            background-image: url("@/assets/icon1.svg");
                        }

                        .storyLogo2 {
                            background-image: url("@/assets/icon2.svg");
                        }

                        .storyLogo3 {
                            background-image: url("@/assets/icon3.svg");
                        }
                    }
                }
            }
            .rightBox {
                padding-left: 90px;
            }

            .rightBox2 {
                padding-left: 170px;
            }
        }
    }

    .first {
        margin-top: 24px;

        background-color: #fbf7f2;

        .image {
            width: 804px;
            height: 685px;

            position: absolute;
            bottom: 0;
            right: -180px;

            background-image: url("@/assets/landing1.webp");
            background-size: contain;
        }
    }

    .second {
        height: 804px;

        padding-bottom: 20px;
        .image {
            width: 532px;
            height: 684px;

            margin-top: 20px;

            background-image: url("@/assets/landing2.webp");
            background-size: contain;
        }
    }

    .third {
        background-color: #e6f3e6;
        .image {
            width: 546px;
            height: 740px;

            margin-top: 20px;
            margin-left: 20px;

            background-image: url("@/assets/landing3.webp");
            background-size: cover;
        }
    }

    .four {
        height: auto;

        padding: 60px;

        .image {
            width: 526px;
            height: 735px;

            background-image: url("@/assets/landing4.webp");
            background-size: contain;
        }
    }

    .productContainer {
        text-align: center;

        background-color: #f8f9fa;

        .title {
            padding-top: 80px;
            padding-bottom: 80px;

            font-size: 40px;
            font-weight: bold;

            text-align: center;
        }

        .button {
            margin-top: 40px;
            padding-bottom: 160px;

            font-size: 16px;
            font-weight: bold;

            text-decoration-line: underline;

            a {
                text-decoration: none;

                color: rgb(33, 37, 41);
            }
        }
    }

    .keywordContainer {
        text-align: center;

        .title {
            margin-top: 40px;

            font-size: 18px;

            a {
                font-weight: bold;

                text-decoration: underline;
                text-decoration-color: #212529;

                color: #212529;
            }
        }
        .keyword {
            max-width: 1024px;

            padding-bottom: 20px;

            display: flex;
            justify-content: center;

            @include setCenter;

            div {
                padding: 13px;

                font-size: 16px;

                a {
                    text-decoration: none;

                    color: #212529;
                }
            }
        }
    }
}
</style>
