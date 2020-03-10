/**
 * @desc common notify function mixin use element-ui
 */
import { Notification } from 'element-ui'
export default {    
    methods: {
        /**
         * @desc elememt-ui notify function
         * @param {*} res Obj: dbData
         * @param {*} type string['success','error','warning']
         * @param {*} customClass string['bg-green-200','bg-red-200','bg-yellow-200']
         */
        async notifyFunc(resCode) {            
            const _MSG = {
                111200: '111200 Success To Add Manager !!',
                111500: '111500 Failed To Add Manager !!',
                111400: '111400 Email is exist!!',
                112200: '112200 Success To Update Manager !!',
                112500: '112500 Failed To Update Manager !!',
                113200: '',
                113500: '113500 Failed To Fetch Manager Data List!!',
                114200: '',
                114500: '114500 Failed To Fetch Manager Data !!',
                115200: '115200 Success To Delete Manager !!',
                115500: '115500 Failed To Delete Manager Data !!',
                116200: '116200 Login Success! Welcome !',
                116400: '116400 Failed To Login! This Email is not exist.',
                117400: '117400 Failed To Login! This Password is incorrect ',
            
                121200: '121200 Success To Add Role of Manager !!',
                121500: '121500 Failed To Add Role of Manager !!',
                121400: '121400 Role is exist!!',
                122200: '122200 Success To Update Role of Manager !!',
                122500: '122500 Failed To Update Role of Manager !!',
                123500: '123500 Failed To Fetch Role of Manager Data List!!',
                125200: '125200 Success To Delete Role of Manager !!',
                125500: '125500 Failed To Delete Role of Manager Data !!',
            
                131200: '131200 Success To Add Access of Manager !!',
                131500: '131500 Failed To Add Access of Manager !!',
                131400: '131400 Access is exist!!',
                132200: '132200 Success To Update Access of Manager !!',
                132500: '132500 Failed To Update Access of Manager !!',
                133500: '133500 Failed To Fetch Access of Manager Data List!!',
                135200: '135200 Success To Delete Access of Manager !!',
                135500: '135500 Failed To Delete Access of Manager Data !!',
            
                141200: '141200 Success To Add Brand !!',
                141500: '141500 Failed To Add Brand !!',
                141400: '141400 Brand is exist!!',
                142200: '142200 Success To Update Brand !!',
                142500: '142500 Failed To Update Brand !!',
                143500: '143500 Failed To Fetch Brand Data List!!',
                145200: '145200 Success To Delete Brand !!',
                145500: '145500 Failed To Delete Brand Data !!',
            
                151200: '151200 Success To Add GoodsColor !!',
                151500: '151500 Failed To Add GoodsColor !!',
                151400: '151400 GoodsColor is exist!!',
                152200: '152200 Success To Update GoodsColor !!',
                152500: '152500 Failed To UpdateGoodsColord !!',
                153500: '153500 Failed To Fetch GoodsColor Data List!!',
                155200: '155200 Success To Delete GoodsColor !!',
                155500: '155500 Failed To Delete GoodsColor Data !!',
            
                161200: '161200 Success To Add GoodsCate !!',
                161500: '161500 Failed To Add GoodsCate !!',
                161400: '161400 GoodsCate is exist!!',
                162200: '162200 Success To Update GoodsCate !!',
                162500: '162500 Failed To Update GoodsCate !!',
                163500: '163500 Failed To Fetch GoodsCate Data List!!',
                165200: '165200 Success To Delete GoodsCate !!',
                165500: '165500 Failed To Delete GoodsCate Data !!',
            
                171200: '171200 Success To Add GoodsType !!',
                171500: '171500 Failed To Add GoodsType !!',
                171400: '171400 GoodsType is exist!!',
                172200: '172200 Success To Update GoodsType !!',
                172500: '172500 Failed To Update GoodsType !!',
                173500: '173500 Failed To Fetch GoodsType Data List!!',
                175200: '175200 Success To Delete GoodsType !!',
                175500: '175500 Failed To Delete GoodsType Data !!',
            
                181200: '181200 Success To Add GoodsTypeAttr !!',
                181500: '181500 Failed To Add GoodsTypeAttr !!',
                182200: '182200 Success To Update GoodsTypeAttr !!',
                182500: '182500 Failed To Update GoodsTypeAttr !!',
                183500: '183500 Failed To Fetch GoodsTypeAttr Data List!!',
                185200: '185200 Success To Delete GoodsTypeAttr !!',
                185500: '185500 Failed To Delete GoodsTypeAttr Data !!',
            
                191200: '191200 Success To Add Goods !!',
                191500: '191500 Failed To Add Goods !!',
                192200: '192200 Success To Update Goods !!',
                192500: '192500 Failed To Update Goods !!',
                193500: '193500 Failed To Fetch Goods Data List!!',
                195200: '195200 Success To Delete Goods !!',
                195500: '195500 Failed To Delete Goods Data !!',
            
                201200: '201200 Success To Add Nav !!',
                201400: '201400 Nav Title is exist!!',
                201500: '201500 Failed To Add Nav !!',
                202200: '202200 Success To Update Nav !!',
                202500: '202500 Failed To Update Nav !!',
                205200: '205200 Success To Delete Nav !!',
                205500: '205500 Failed To Delete Nav Data !!',
            
                211200: '211200 Success To Add Article Cate !!',
                211400: '211400 Article Cate Title is exist!!',
                211500: '211500 Failed To Add Article Cate !!',
                212200: '212200 Success To Update Article Cate !!',
                212500: '212500 Failed To Update Article Cate !!',
                215200: '215200 Success To DeleteArticle Cate !!',
                215500: '215500 Failed To Delete Article Cate Data !!',
            
                221200: '221200 Success To Add Article !!',
                221400: '221400 Article Title is exist!!',
                221500: '221500 Failed To Add Article !!',
                222200: '222200 Success To Update Article !!',
                222500: '222500 Failed To Update Article !!',
                225200: '225200 Success To DeleteArticle !!',
                225500: '225500 Failed To Delete Article Data !!',
            
            
            
                991200: '991200 Success To Add Data!!',
                991500: '991500 Failed To Add Data!!',
                992200: '992200 Success To Update Data!!',
                992500: '992500 Failed To Update Data!!',
                995200: '995200 Success To Delete Data!!',
                995500: '995500 Failed To Delete Data !!',
            
                90500: '90500 Server ERROR',
                91500: '91500 Parmas Insert ERROR'
            }
            const _TITLE = {
                111200: '增加管理員成功!',
                111500: '發生錯誤,增加管理員失敗! 請聯絡系統管理員',
                111400: '該信箱重複!',
                112200: '更新管理員成功!',
                112500: '發生錯誤,更新管理員失敗! 請聯絡系統管理員',
                113200: '',
                113500: '發生錯誤,獲取管理員列表失敗! 請聯絡系統管理員',
                114200: '',
                114500: '發生錯誤,獲取管理員數據失敗! 請聯絡系統管理員',
                115200: '刪除該管理員成功!',
                115500: '發生錯誤,刪除管理員數據失敗! 請聯絡系統管理員',
                116200: '登入成功!,歡迎回來',
                116400: '登入錯誤, 電子郵件信箱不存在! ',
                117400: '登入錯誤, 密碼不正確! ',
            
                121200: '增加管理員角色成功!',
                121500: '發生錯誤,增加管理員角色失敗! 請聯絡系統管理員',
                121400: '該角色名稱重複!',
                122200: '更新管理員角色成功!',
                122500: '發生錯誤,更新管理員角色失敗! 請聯絡系統管理員',
                123500: '發生錯誤,獲取管理員角色列表失敗! 請聯絡系統管理員',
                125200: '刪除該管理員角色成功!',
                125500: '發生錯誤,刪除管理員角色數據失敗! 請聯絡系統管理員',
            
                131200: '增加管理員權限成功!',
                131500: '發生錯誤,增加管理員權限失敗! 請聯絡系統管理員',
                131400: '該權限名稱重複!',
                132200: '更新管理員權限成功!',
                132500: '發生錯誤,更新管理員權限失敗! 請聯絡系統管理員',
                133500: '發生錯誤,獲取管理員權限列表失敗! 請聯絡系統管理員',
                135200: '刪除該管理員權限成功!',
                135500: '發生錯誤,刪除管理員權限數據失敗! 請聯絡系統管理員',
            
                141200: '增加品牌成功!',
                141500: '發生錯誤,增加品牌失敗! 請聯絡系統管理員',
                141400: '該品牌名稱重複!',
                142200: '更新品牌成功!',
                142500: '發生錯誤,更新品牌失敗! 請聯絡系統管理員',
                143500: '發生錯誤,獲取品牌列表失敗! 請聯絡系統管理員',
                145200: '刪除該品牌成功!',
                145500: '發生錯誤,刪除品牌數據失敗! 請聯絡系統管理員',
            
                151200: '增加商品顏色成功!',
                151500: '發生錯誤,增加商品顏色失敗! 請聯絡系統管理員',
                151400: '該商品顏色名稱重複!',
                152200: '更新商品顏色成功!',
                152500: '發生錯誤,更新商品顏色失敗! 請聯絡系統管理員',
                153500: '發生錯誤,獲取商品顏色列表失敗! 請聯絡系統管理員',
                155200: '刪除該商品顏色成功!',
                155500: '發生錯誤,刪除商品顏色數據失敗! 請聯絡系統管理員',
            
                161200: '增加商品分類成功!',
                161500: '發生錯誤,增加商品分類失敗! 請聯絡系統管理員',
                161400: '該商品分類名稱重複!',
                162200: '更新商品分類成功!',
                162500: '發生錯誤,更新商品分類失敗! 請聯絡系統管理員',
                163500: '發生錯誤,獲取商品分類列表失敗! 請聯絡系統管理員',
                165200: '刪除該商品分類成功!',
                165500: '發生錯誤,刪除商品分類數據失敗! 請聯絡系統管理員',
            
                171200: '增加商品類型成功!',
                171500: '發生錯誤,增加商品類型失敗! 請聯絡系統管理員',
                171400: '該商品類型名稱重複!',
                172200: '更新商品類型成功!',
                172500: '發生錯誤,更新商品類型失敗! 請聯絡系統管理員',
                173500: '發生錯誤,獲取商品類型列表失敗! 請聯絡系統管理員',
                175200: '刪除該商品類型成功!',
                175500: '發生錯誤,刪除商品類型數據失敗! 請聯絡系統管理員',
            
                181200: '增加商品類型屬性成功!',
                181500: '發生錯誤,增加商品類型屬性失敗! 請聯絡系統管理員',
                182200: '更新商品類型屬性成功!',
                182500: '發生錯誤,更新商品類型屬性失敗! 請聯絡系統管理員',
                183500: '發生錯誤,獲取商品類型屬性列表失敗! 請聯絡系統管理員',
                185200: '刪除該商品類型屬性成功!',
                185500: '發生錯誤,刪除商品類型屬性數據失敗! 請聯絡系統管理員',
            
                191200: '增加商品成功!',
                191500: '發生錯誤,增加商品失敗! 請聯絡系統管理員',
                192200: '更新商品成功!',
                192500: '發生錯誤,更新商品失敗! 請聯絡系統管理員',
                193500: '發生錯誤,獲取商品列表失敗! 請聯絡系統管理員',
                195200: '刪除該商品成功!',
                195500: '發生錯誤,刪除商品數據失敗! 請聯絡系統管理員',
            
                201200: '增加導航成功!',
                201400: '該導航名稱重複!',
                201500: '發生錯誤,增加導航失敗! 請聯絡系統管理員',
                202200: '更新導航成功!',
                202500: '發生錯誤,更新導航失敗! 請聯絡系統管理員',
                205200: '刪除該導航成功!',
                205500: '發生錯誤,刪除導航數據失敗! 請聯絡系統管理員',
            
                211500: '發生錯誤,增加文章分類失敗! 請聯絡系統管理員',
                212200: '更新文章分類成功!',
                212500: '發生錯誤,更新文章分類失敗! 請聯絡系統管理員',
                215200: '刪除該文章分類成功!',
                211400: '該文章分類名稱重複!',
                215500: '發生錯誤,刪除文章分類數據失敗! 請聯絡系統管理員',
                211200: '增加文章分類成功!',
            
                221500: '發生錯誤,增加文章失敗! 請聯絡系統管理員',
                222200: '更新文章成功!',
                222500: '發生錯誤,更新文章失敗! 請聯絡系統管理員',
                225200: '刪除該文章成功!',
                221400: '該文章名稱重複!',
                225500: '發生錯誤,刪除文章數據失敗! 請聯絡系統管理員',
                221200: '增加文章成功!',
            
            
            
            
                991200: '新增更新成功!',
                991500: '新增更新失敗! 請聯絡系統管理員',
                992200: '更新成功!',
                992500: '更新失敗! 請聯絡系統管理員',
                995200: '刪除成功!',
                995500: '刪除失敗! 請聯絡系統管理員',
            
                90500: '發生不明錯誤,請聯絡系統管理員!',
                91500: '參數校驗錯誤,請聯絡系統管理員!'
            }
            
            const CODE = resCode.toString()
            let type = 'error'
            let customClass = 'bg-red-200'
            
            if(CODE.endsWith('200')) { type = 'success' }
            if(CODE.endsWith('200')) { customClass = 'bg-green-200' }
            if(CODE.endsWith('400')) { type = 'warning' }
            if(CODE.endsWith('400')) { customClass = 'bg-yellow-200' }
            
            Notification({
                title: _MSG[resCode],
                message: _TITLE[resCode],
                type,
                customClass
            })
            if(CODE.endsWith('200')) this.$router.push(`/admin/${this.config.afterSavePushTo}`)
        }
    }
}