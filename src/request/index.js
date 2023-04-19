// Copyright (c) 2023 smable<316245279@qq.com>
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import request from "./axios";

export const getReportdata = ()=>request.get('/reportdata')
export const getSaledata = ()=> request.get('/saledata')
export const getKeyworddata = ()=> request.get('/keyworddata')
export const getCategorydata = ()=> request.get('/categorydata')
export const getMapdata = ()=> request.get('/mapdata')