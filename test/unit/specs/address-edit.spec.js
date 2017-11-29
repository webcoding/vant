import { mount } from 'avoriaz';
import AddressEdit from 'packages/address-edit';
import AddressDetail from 'packages/address-edit/Detail';
import areaList from '../mock/area.json';

describe('AddressEdit', () => {
  let wrapper;
  afterEach(() => {
    wrapper && wrapper.destroy();
  });

  it('create a AddressEdit', () => {
    wrapper = mount(AddressEdit);
    expect(wrapper.hasClass('van-address-edit')).to.be.true;
    expect(wrapper.find('.van-field__control')[0].element.value).to.equal('');
    expect(wrapper.find('.van-field__control')[1].element.value).to.equal('');
    expect(wrapper.find('.van-field__control')[2].element.value).to.equal('');
    expect(wrapper.find('.van-address-edit__area .van-cell__value span')[0].text()).to.equal('选择省');
    expect(wrapper.find('.van-address-edit__area .van-cell__value span')[1].text()).to.equal('选择市');
    expect(wrapper.find('.van-address-edit__area .van-cell__value span')[2].text()).to.equal('选择区');
  });

  it('create a AddressEdit with props', () => {
    const addressInfo = {
      name: '测试',
      tel: '123123213',
      province: '浙江省',
      city: '杭州市',
      county: '西湖区',
      address_detail: '详细地址',
      postal_code: '10000',
      is_default: true
    };

    wrapper = mount(AddressEdit, {
      propsData: {
        areaList,
        addressInfo: addressInfo,
        showPostal: true,
        showSetDefault: true,
        showSearchResult: true,
        searchResult: []
      }
    });

    expect(wrapper.find('.van-field__control')[0].element.value).to.equal(addressInfo.name);
    expect(wrapper.find('.van-field__control')[1].element.value).to.equal(addressInfo.tel);
    expect(wrapper.find('.van-field__control')[2].element.value).to.equal(addressInfo.address_detail);
    expect(wrapper.find('.van-field__control')[3].element.value).to.equal(addressInfo.postal_code);
    expect(wrapper.find('.van-address-edit__area .van-cell__value span')[0].text()).to.equal(addressInfo.province);
    expect(wrapper.find('.van-address-edit__area .van-cell__value span')[1].text()).to.equal(addressInfo.city);
    expect(wrapper.find('.van-address-edit__area .van-cell__value span')[2].text()).to.equal(addressInfo.county);
    expect(wrapper.find('.van-switch-cell').length).to.equal(1);
  });

  it('save AddressInfo', () => {
    const addressInfo = {
      name: '',
      tel: '123123213',
      province: '浙江省',
      city: '杭州市',
      county: '西湖区',
      address_detail: '详细地址',
      postal_code: '10000',
      is_default: true
    };

    wrapper = mount(AddressEdit, {
      propsData: {
        areaList,
        addressInfo: addressInfo,
        showPostal: true,
        showSetDefault: true,
        showSearchResult: true,
        searchResult: []
      }
    });

    const saveButton = wrapper.find('.van-button')[0];

    // name empty
    wrapper.vm.addressInfo.name = '';
    saveButton.trigger('click');
    expect(wrapper.vm.errorInfo['name']).to.be.true;
    wrapper.find('.van-field__control')[0].trigger('focus');
    expect(wrapper.vm.errorInfo['name']).to.be.false;

    // name too long
    wrapper.vm.addressInfo.name = '111111111111111111111111111';
    saveButton.trigger('click');
    expect(wrapper.vm.errorInfo['name']).to.be.true;
    wrapper.find('.van-field__control')[0].trigger('focus');
    expect(wrapper.vm.errorInfo['name']).to.be.false;

    // tel empty
    wrapper.vm.addressInfo.name = '123';
    wrapper.vm.addressInfo.tel = '';
    saveButton.trigger('click');
    expect(wrapper.vm.errorInfo['tel']).to.be.true;
    wrapper.find('.van-field__control')[1].trigger('focus');
    expect(wrapper.vm.errorInfo['tel']).to.be.false;

    // area_code empty
    wrapper.vm.addressInfo.tel = '13000000000';
    wrapper.vm.addressInfo.area_code = '';
    saveButton.trigger('click');
    expect(wrapper.vm.errorInfo['area_code']).to.be.true;

    // area_code invalid
    wrapper.vm.addressInfo.tel = '13000000000';
    wrapper.vm.addressInfo.area_code = '-1';
    saveButton.trigger('click');
    expect(wrapper.vm.errorInfo['area_code']).to.be.true;

    // address_detail empty
    wrapper.vm.addressInfo.area_code = '100000';
    wrapper.vm.addressInfo.address_detail = '';
    saveButton.trigger('click');
    expect(wrapper.vm.errorInfo['address_detail']).to.be.true;
    wrapper.find('.van-field__control')[2].trigger('focus');
    expect(wrapper.vm.errorInfo['address_detail']).to.be.false;

    // address_detail too long
    let longAddress = '1';
    for (let i = 0; i < 300; i++) {
      longAddress += '1';
    }
    wrapper.vm.addressInfo.address_detail = longAddress;
    saveButton.trigger('click');
    expect(wrapper.vm.errorInfo['address_detail']).to.be.true;
    wrapper.find('.van-field__control')[2].trigger('focus');
    expect(wrapper.vm.errorInfo['address_detail']).to.be.false;

    // postal_code invalid
    wrapper.vm.addressInfo.address_detail = '123';
    wrapper.vm.addressInfo.postal_code = '123';
    saveButton.trigger('click');
    expect(wrapper.vm.errorInfo['postal_code']).to.be.true;
    wrapper.find('.van-field__control')[3].trigger('focus');
    expect(wrapper.vm.errorInfo['postal_code']).to.be.false;

    // valid result
    wrapper.vm.addressInfo.postal_code = '123456';
    saveButton.trigger('click');

    // not show postal_code
    wrapper.vm.addressInfo.postal_code = '156';
    wrapper.vm.showPostal = false;
    saveButton.trigger('click');
    expect(wrapper.vm.errorInfo['postal_code']).to.be.false;
  });

  it('show search result', done => {
    wrapper = mount(AddressEdit, {
      propsData: {
        addressInfo: {},
        showSearchResult: true,
        searchResult: [{
          name: '黄龙万科中心',
          address: '杭州市西湖区'
        }, {
          name: '黄龙万科中心H座'
        }, {
          address: '杭州市西湖区'
        }]
      }
    });

    wrapper.find('.van-field__control')[2].trigger('focus');
    wrapper.vm.$nextTick(() => {
      const items = wrapper.find('.van-address-edit-detail__suggest-item');
      expect(items.length).to.equal(3);

      items[0].trigger('click');
      wrapper.vm.$nextTick(() => {
        expect(wrapper.find('.van-field__control')[2].element.value).to.equal('杭州市西湖区 黄龙万科中心');

        items[1].trigger('click');
        wrapper.vm.$nextTick(() => {
          expect(wrapper.find('.van-field__control')[2].element.value).to.equal('黄龙万科中心H座');
          items[2].trigger('click');

          wrapper.vm.$nextTick(() => {
            expect(wrapper.find('.van-field__control')[2].element.value).to.equal('杭州市西湖区');

            wrapper.find('.van-field__control')[2].trigger('blur');
            setTimeout(() => {
              done();
            }, 300);
          });
        });
      });
    });
  });

  it('select area', () => {
    wrapper = mount(AddressEdit, {
      propsData: {
        areaList,
        addressInfo: {}
      }
    });

    wrapper.vm.onAreaConfirm([]);
    wrapper.vm.onAreaConfirm([{ code: -1 }]);
    wrapper.vm.onAreaConfirm([{ code: 1 }, { code: -1 }]);
    wrapper.vm.onAreaConfirm([{ code: 1 }, { code: 1 }, { code: -1 }]);
    expect(wrapper.vm.addressInfo['area_code']).to.equal(undefined);

    wrapper.vm.onAreaConfirm([{ name: '浙江省' }, { name: '杭州市' }, { name: '西湖区', code: '123456' }]);
    expect(wrapper.vm.addressInfo['province']).to.equal('浙江省');
    expect(wrapper.vm.addressInfo['city']).to.equal('杭州市');
    expect(wrapper.vm.addressInfo['county']).to.equal('西湖区');
    expect(wrapper.vm.addressInfo['area_code']).to.equal('123456');
  });

  it('delete address', done => {
    wrapper = mount(AddressEdit, {
      attachToDocument: true,
      propsData: {
        areaList,
        isDeleting: true,
        addressInfo: {
          id: '123'
        }
      }
    });

    const deleteButton = wrapper.find('.van-button')[1];
    deleteButton.trigger('click');
    wrapper.vm.onDeleteAddress();

    setTimeout(() => {
      wrapper.vm.isDeleting = false;
      wrapper.vm.$nextTick(() => {
        deleteButton.trigger('click');
        setTimeout(() => {
          expect(document.querySelectorAll('.van-dialog').length).to.equal(1);

          wrapper.vm.$on('delete', () => {
            done();
          });
          document.querySelector('.van-dialog__confirm').click();
        }, 300);
      });
    }, 300);
  });

  it('on change detail', done => {
    wrapper = mount(AddressEdit);

    wrapper.vm.$on('change-detail', (val) => {
      expect(val).to.equal('123');
      done();
    });

    const field = wrapper.find('.van-field__control')[2];
    field.element.value = '123';
    field.trigger('input');
  });

  it('clear address detail in ios', done => {
    wrapper = mount(AddressEdit, {
      propsData: {
        addressInfo: {
          address_detail: '123'
        }
      }
    });

    wrapper.vm.isAndroid = false;
    wrapper.find('.van-field__control')[2].trigger('focus');

    wrapper.vm.$nextTick(() => {
      wrapper.find('.van-field__icon')[0].trigger('touchstart');
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.addressInfo.address_detail).to.equal('');
        done();
      });
    });
  });

  it('finish edit address detail in android', done => {
    wrapper = mount(AddressDetail, {
      propsData: {
        value: '123'
      }
    });

    wrapper.vm.$on('input', val => {
      wrapper.vm.value = val;
    });

    wrapper.setData({
      isAndroid: true
    });
    wrapper.find('.van-field__control')[0].trigger('focus');

    wrapper.vm.$nextTick(() => {
      wrapper.find('.van-field__icon')[0].trigger('touchstart');
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.value).to.equal('123');
        done();
      });
    });
  });

  it('watch address info', done => {
    const addressInfo = {
      name: '123'
    };

    wrapper = mount(AddressEdit, {
      propsData: {
        addressInfo: {}
      }
    });

    wrapper.setProps({ addressInfo });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.currentInfo.name).to.equal('123');
      done();
    });
  });
});
