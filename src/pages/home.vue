<template>
  <div class="p-16">

    <header class="head">
      <div class="text-white bg-blue-50 text-white--bg-blue-50--custom">
        <div class="f-title title-14 f-title--title-14--custom">
          Panin
        </div>
      </div>
    </header>

    <body>

      <section class="seg1">
        <div class="f-caption caption-12 f-caption--caption-12--custom">
          CREDIT CARD NUMBER <span @click="support">?</span>
          <f-input :maxlength="19" :errorMsg="remainDigit" format="{4} {4} {4} {4}" type="digital" v-model="bankCard"
            @input="onChange" placeholder="Example 1234 5678 9012 3456" />
        </div>
      </section>

      <section class="seg2">
        <div class="f-caption caption-12 f-caption--caption-12--custom2">
          PAYMENT AMOUNT
          <div class="moneyBox">
            <f-input-money placeholder="50.000" ref="input" v-model="amount" :min-amount="currentPayerMinAmount" @input="onChange2">
              <template slot="icon-outer-left">
                <div class="f-input__icon-outer-right mr-12 f-input__icon-outer-right--custom">
                  <img src="//a.m.dana.id/resource/imgs/fiat/currency.svg?t=1" />
                </div>
              </template>
            </f-input-money>
          </div>
        </div>
      </section>
    </body>

    <f-btn :disabled='isDisabled' type="primary" size="large">
      CHECK BILL
    </f-btn>

  </div>
</template>



<script>
  import {
    FBtn,
    FInput,
    FInputMoney
  } from '@dana/fiat'
  export default {
    components: {
      FBtn,
      FInput,
      FInputMoney
    },
    data() {
      return {
        dataSet: {
          bankCard: false,
          amount: false,
          isDisabled: true,
        },
        bankCard: '',
        amount: '',
        currentPayerMinAmount: 50000,
        remainDigit: ""
      }
    },
    methods: {
      onChange(event) {
        console.log('on event')
        if (this.bankCard.length >= 1 && this.bankCard.length < 19) {
          this.remainDigit = "The credit card number must be 12 digits"
        } else if(this.bankCard.length < 19){
          this.dataSet.bankCard = true;
        }else{
          this.remainDigit = "";
        }
      },
      onChange2(event) {
        if(parseInt(this.amount.replaceAll('.','')) >= 50000){
          this.dataSet.amount = true;
        }
        else{
          this.dataSet.amount = false;
        }
      }
    },
    computed: {
      isDisabled(){
        if(parseInt(this.amount.replaceAll('.','')) >= 50000 && this.bankCard.length == 19){
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
    margin: -33px 0 0 -20px;
  }
</style>