<template>
  <div>
    <div class="text-white bg-blue-50">
      <div class="f-title title-18 inverted p-10">
        Panin
      </div>
    </div>

    <div class="p-16">
        <div class="f-caption caption-12">
            <div class="mb-6">
              CREDIT CARD NUMBER <span @click="handleToggle">?</span>
            </div>
            <f-input
              class="mb-16"
              format="{4} {4} {4} {4}"
              type="digital"
              ref="input"
              input-type="text-box"
              placeholder="Example 1234 4892 3541 1532"
              :maxlength="19"
              v-model="bankCard"
              :errorMsg="errorMsg"
              @input="eventBankCardError"
              :showClear="false"
            />
        </div>  

      <f-input-money
        class="mb-16"
        label="PAYMENT AMOUNT"
        placeholder="50.000"
        ref="input"
        :show-helper-icon="true"
        v-model="transferAmount"
        :min-amount="currentPayerMinAmount"
        @input="moneyBtnHandler">
        <template slot="icon-outer-left">
          <div class="f-input__icon-outer-right mr-12">
            <img src="//a.m.dana.id/resource/imgs/fiat/currency.svg?t=1" />
          </div>
        </template>
      </f-input-money>

      <f-btn type="primary" size="large" :disabled="isBtnDisable">
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
            <f-card-img class="mt-10">
              <img src="//a.m.dana.id/resource/imgs/fiat/call-cs@3x.png" />
            </f-card-img>
          </f-card-content>
          <div class="mt-16">
            <f-card-actions stacked>
                <f-btn size="large" @click="handleToggle">
                  GOT IT!
                </f-btn>
            </f-card-actions>
          </div>
        </f-card>
      </f-dialog>



    </div>



  </div>
</template>

<script>
import { FInput } from "@dana/fiat"
import { FBtn, FBtnWrapper, FInputMoney, FDialog } from '@dana/fiat'
import { FCard, FCardImg, FCardContent, FCardAction } from "@dana/fiat"

export default {
  data() {
    return {
      transferAmount: '',
      bankCard: '',
      errorMsg: '',
      errorMsgMoney: 'The minimum amount for credit card payment is Rp50.000',
      currentPayerMinAmount: 50000,
      isBtnDisable: true,
      isAmountFilled: false,
      isCardFilled: false,
      toggle: true
    }
  }
  ,components: {
    FBtn,
    FBtnWrapper,
    FInput,
    FInputMoney,
    FDialog,
    FCard, FCardImg, FCardContent, FCardAction
  },
  methods: {
  closeModal () {
    this.$refs.sheet.hide()
  },
  checkBankCardLength(event){
    const card = event.target.value
    console.log(card)
  },
  eventBankCardError (event) {
    if(event.length > 0 && event.length < 19){
      this.errorMsg = 'The credit card number must be 12 digits'
      this.isCardFilled = false;
      this.isBtnDisable = true
    }else if(event.length == 19){
      this.isCardFilled = true
      this.errorMsg = ''
      if(this.isAmountFilled){
        this.isBtnDisable = false
      }
    }else{
      this.errorMsg = ''
      this.isBtnDisable = true
    }
  },
  moneyBtnHandler (event) {
    if(parseInt(event.replaceAll('.','')) >= 50000){
      this.isAmountFilled = true
       if(this.isCardFilled){
         this.isBtnDisable = false
       }
    }else{
      this.isAmountFilled = false
      this.isBtnDisable = true
    }
  },
  handleToggle () {
    this.toggle = !this.toggle
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
.f-input__icon-outer-right img {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
