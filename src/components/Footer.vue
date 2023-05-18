<template>
    <div :class="$style.mainContainer">
        <div :class="$style.container">
            <div :class="$style.coverSection">
                <div :class="[$style.linkSection, 'text-color']">
                    <div :class="$style.linkBox">
                        <div>
                            <a href="https://www.daangn.com/hot_articles"
                                >중고거래</a
                            >
                        </div>
                        <div>
                            <a href="https://town.daangn.com/">동네가게</a>
                        </div>
                        <div>
                            <a href="https://www.daangn.com/kr/jobs"
                                >당근알바</a
                            >
                        </div>
                    </div>
                    <div :class="$style.linkBox">
                        <div>
                            <a href="https://business.daangn.com/"
                                >당근비즈니스</a
                            >
                        </div>
                        <div>
                            <a href="https://chat.daangn.com/onboarding"
                                >채팅하기</a
                            >
                        </div>
                    </div>
                    <div :class="$style.linkBox">
                        <div>
                            <a href="https://cs.kr.karrotmarket.com/wv/faqs"
                                >자주 묻는 질문</a
                            >
                        </div>
                        <div>
                            <a href="https://team.daangn.com/">회사 소개</a>
                        </div>
                        <div>
                            <a href="https://team.daangn.com/jobs">인재 채용</a>
                        </div>
                    </div>
                </div>

                <div :class="$style.downloadSection">
                    <div :class="[$style.text, 'text-color']">
                        당근마켓 앱 다운로드
                    </div>
                    <div :class="$style.downloadBox">
                        <a
                            href="https://apps.apple.com/kr/app/%EB%8B%B9%EA%B7%BC%EB%A7%88%EC%BC%93-%EC%A4%91%EA%B3%A0%EA%B1%B0%EB%9E%98-%ED%95%84%EC%88%98%EC%95%B1/id1018769995"
                            ><div
                                :class="[$style.download, $style.appstore]"
                            ></div
                        ></a>
                        <a
                            href="https://play.google.com/store/apps/details?id=com.towneers.www"
                            ><div
                                :class="[$style.download, $style.google]"
                            ></div
                        ></a>
                    </div>
                </div>
            </div>
        </div>
        <div :class="$style.container">
            <div :class="$style.infoSection">
                <div :class="$style.infoBox">
                    <div :class="$style.coverInfo">
                        <div :class="$style.info">
                            <div><span :class="$style.bold">대표</span></div>

                            <div>김재현,김용현</div>
                        </div>
                        <div :class="$style.bar">|</div>
                        <div :class="$style.info">
                            <div>
                                <span :class="$style.bold">사업자번호</span>
                            </div>
                            <div>375-87-00088</div>
                        </div>
                    </div>
                </div>
                <div :class="$style.info">
                    <div>
                        <span :class="$style.bold">직업제공사업 신고번호</span>
                    </div>
                    <div>2016-서울서초--0051</div>
                </div>
                <div :class="$style.info">
                    <div><span :class="$style.bold">주소</span></div>
                    <div>
                        서울특별시 구로구 디지털로 30길 28, 609호 (당근서비스)
                    </div>
                </div>
                <div :class="$style.coverInfo">
                    <div :class="$style.info">
                        <div><span :class="$style.bold">전화</span></div>
                        <div>1544-9796</div>
                    </div>
                    <div :class="$style.bar">|</div>
                    <div :class="$style.info">
                        <div><span :class="$style.bold">고객문의</span></div>
                        <div>cs@daangnservice.com</div>
                    </div>
                </div>
                <div :class="[$style.section, $style.inquiry]">
                    <div><a href="contact@daangn.com">제휴 문의</a></div>
                    <div><a href="ad@daangn.com">광고 문의</a></div>
                    <div><a href="pr@daangn.com">PR 문의</a></div>
                    <div><a href="ir@daangn.com">IR 문의</a></div>
                </div>
                <div :class="[$style.section, $style.policy]">
                    <div>
                        <a href="https://www.daangn.com/policy/terms"
                            >이용약관</a
                        >
                    </div>
                    <div>
                        <a href="https://www.daangn.com/policy/privacy"
                            ><span :class="[$style.bold, $style.blackText]"
                                >개인정보처리방침</span
                            ></a
                        >
                    </div>
                    <div>
                        <a href="https://www.daangn.com/policy/location"
                            >위치기반서비스 이용약관</a
                        >
                    </div>
                    <div>
                        <a href="https://www.daangn.com/wv/faqs/3994"
                            >이용자보호 비전과 계획</a
                        >
                    </div>
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
export default class Footer extends Vue {}
</script>

<style lang="scss" module>
@import "@/assets/utils.scss";
@import "@/assets/theme.scss";

.mainContainer {
    width: 100%;

    border-top: 1px solid #eaebee;

    .container {
        max-width: 768px;

        @include setCenter;

        .coverSection {
            padding-top: 30px;
            padding-bottom: 30px;

            display: flex;

            .linkSection {
                width: 60%;

                display: flex;

                font-size: 14px;

                .linkBox {
                    padding-right: 60px;

                    a {
                        text-decoration: none;
                    }

                    div {
                        padding-top: 10px;
                        padding-bottom: 10px;
                    }
                }
            }

            .downloadSection {
                width: 40%;

                .text {
                    font-weight: bold;
                }

                .downloadBox {
                    display: flex;
                    justify-content: space-around;

                    .download {
                        width: 140px;
                        height: 60px;

                        padding: 10px;

                        background-size: contain;
                        background-repeat: no-repeat;
                        background-position: center center;
                    }

                    .appstore {
                        background-image: url("@/assets/button_appstore.svg");
                    }

                    .google {
                        background-image: url("@/assets/button_google.svg");
                    }
                }
            }
        }

        .infoSection {
            padding: 20px;
            padding-left: 0px;

            border-top: 1px solid #eaebee;

            color: #868b94;

            .coverInfo {
                display: flex;

                .bar {
                    padding-left: 3px;
                    padding-right: 3px;

                    font-size: 13px;
                }
            }

            .info,
            .section {
                font-size: 13px;

                display: flex;
            }

            .inquiry,
            .policy {
                padding-top: 20px;

                font-weight: bold;

                div {
                    margin-right: 16px;
                }

                a {
                    text-decoration: none;

                    color: #868b94;
                }

                .blackText {
                    color: #4d5159;
                }
            }
        }
    }
    .bold {
        padding-right: 3px;

        font-weight: bold;
    }
}
</style>
