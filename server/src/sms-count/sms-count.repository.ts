import {DefaultResponse, getDataFromDatabase} from '../db-helpers';

interface CountFromDatabase {
    count: number,
    isReport: number
}

class SmsCountRepository {
    async getSmsCount() {
        const sql = `SELECT COUNT(*) AS count FROM SMS`
        const isReportSql = `SELECT is_report AS isReport FROM SMS`
        const smsCount = await getDataFromDatabase(sql)
        const isReports = await getDataFromDatabase(isReportSql) as DefaultResponse<Array<{isReport: number}>>
        smsCount.data = {
            count: smsCount.data[0]?.count ? smsCount.data[0].count : 0,
            isReport: isReports.data[0]
                ? isReports.data.reduce(
                    (prevReport, currentReport) => prevReport + currentReport.isReport, 0
                  )
                : 0
        }
        return smsCount as DefaultResponse<CountFromDatabase>
    }
}

export default new SmsCountRepository()