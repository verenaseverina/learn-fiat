<template>
  <div class="p-16">

    <div class="text-white bg-blue-50">
      <div class="f-title title-14 inverted p-10">
        Panin
      </div>
    </div>

    <div class="f-caption caption-12 secondary">
      <div class="mb-6">CREDIT CARD NUMBER <span @click="handle">?</span></div>
      <f-input :maxlength="19" :errorMsg="remainDigit" format="{4} {4} {4} {4}" type="digital" v-model="bankCard"
        @input="onChange" placeholder="Example 1234 5678 9012 3456" />
    </div>

    <div class="f-caption caption-12">
      <div class="mb-6">PAYMENT AMOUNT</div>
      <f-input-money placeholder="50.000" ref="input" v-model="amount" :min-amount="currentPayerMinAmount"
        @input="onChange2">
        <template slot="icon-outer-left">
          <div class="f-input__icon-outer-right f-input__icon-outer-right--custom mr-12">
            <img src="//a.m.dana.id/resource/imgs/fiat/currency.svg?t=1" />
          </div>
        </template>
      </f-input-money>
    </div>

    <f-btn :disabled='isDisabled' type="primary" size="large">
      CHECK BILL
    </f-btn>

    <f-dialog type="modal" v-model="toggle">
      <f-card class="p-12 pt-16">
        <f-card-content class="f-text-center">
          <div class="f-title title-16 my-8">
            How To Find Credit Card Number
          </div>
          <div class="f-caption caption-12">
            Find the 16 digits number on the front part of your credit card
          </div>
          <f-card-img class="mt-10" w="100%" h="100%">
            <img src="../images/[images.app.goo.gl][2761].png">
          </f-card-img>
        </f-card-content>
        <div class="mt-16">
          <f-card-actions stacked>
            <f-btn size="large" @click="handle">
              GOT IT!
            </f-btn>
          </f-card-actions>
        </div>
      </f-card>
    </f-dialog>

  </div>
</template>

<script>
  import {
    FBtn,
    FInput,
    FInputMoney,
    FCard,
    FCardImg,
    FCardContent,
    FCardAction,
    FDialog,
    FBtnWrapper
  } from '@dana/fiat'
  export default {
    components: {
      FBtn,
      FInput,
      FInputMoney,
      FCard,
      FCardImg,
      FCardContent,
      FCardAction,
      FDialog,
      FBtnWrapper
    },
    data() {
      return {
        dataSet: {
          bankCard: false,
          amount: false,
          isDisabled: true
        },
        bankCard: '',
        amount: '',
        currentPayerMinAmount: 50000,
        remainDigit: "",
        toggle: true
      }
    },
    methods: {
      onChange(event) {
        if (this.bankCard.length > 0 && this.bankCard.length < 19) {
          this.remainDigit = "The credit card number must be 12 digits"
        } else if (this.bankCard.length == 19) {
          this.dataSet.bankCard = true;
          this.remainDigit = "";
        } 
        // else {
        //   this.remainDigit = "";
        // }
      },
      onChange2(event) {
        if (parseInt(this.amount.replaceAll('.', '')) >= 50000) {
          this.dataSet.amount = true;
        } else {
          this.dataSet.amount = false;
        }
      },
      handle() {
        this.toggle = !this.toggle
      }
    },
    computed: {
      isDisabled() {
        if (parseInt(this.amount.replaceAll('.', '')) >= 50000 && this.bankCard.length == 19) {
          return !this.dataSet.isDisabled
        }
        return this.dataSet.isDisabled
      }
    }
  }
</script>

<style lang="less" scoped>
  .f-input__icon-outer-right {
    width: 0.24rem;
    height: 0.24rem;
    margin-top: 0.26rem;
  }

  .f-input__icon-outer-right--custom img {
    display: block;
    width: 100%;
    height: 100%;
    margin: -33px 0 0 0px;
  }
</style>