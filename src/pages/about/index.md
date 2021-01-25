---
templateKey: about-page
path: /about
title: About me
---
# REST API of Orthanc
## Sending DICOM images( Gởi ảnh dicom)
Gởi ảnh dicom theo cấu trúc sau:
```bash
$ curl -X POST http://localhost:8042/instances --data-binary @CT.X.1.2.276.0.7230010.dcm
```
Orthanc server sẽ tả lại một json chứa các thông tin về vị trí lưu, theo dạng :
```json
{
  "ID" : "e87da270-c52b-4f2a-b8c6-bae25928d0b0",
  "Path" : "/instances/e87da270-c52b-4f2a-b8c6-bae25928d0b0",
  "Status" : "Success"
}
```
Chú ý rằng trong trường hợp của curl, việc cài đặc 'Expect' HTTP Header sẽ làm giảm đáng kể thời gian phản hồi của post request:
```bash
$ curl -X POST -H "Expect:" http://localhost:8042/instances --data-binary @CT.X.1.2.276.0.7230010.dcm
```
## Accessing the content of Orthanc
Cấu tạo của Orthan lưu dử liệu dicom theo "Patient( Bệnh nhaan), Study(Bệnh án), Series(Các sờ ri ảnh), Instance(Một ảnh)", các model chuẩn của tổ chức [DICOM standard](https://www.dicomstandard.org).
### List all the DICOM resources
Cách để lấy danh sách dữ liệu dicom được lưu bởi Orthanc:
```bash
$ curl http://localhost:8042/patients
$ curl http://localhost:8042/studies
$ curl http://localhost:8042/series
$ curl http://localhost:8042/instances
```
Kết của là một json nó chứa một array dữ liệu . Json là một định dạng nhẹ có thể chuyển sang bất cứ ngôn ngữ máy tính nào.
### Accessing a patient
Để truy cập sữ liệu một bệnh nhân sử dụng cấu trúc sau:
```bash
$ curl http://localhost:8042/patients/dc65762c-f476e8b9-898834f4-2f8a5014-2599bc94
```
Ví dụ dữ liệu nhận được từ Orthanc:
```json
{
  "ID" : "07a6ec1c-1be5920b-18ef5358-d24441f3-10e926ea",
  "MainDicomTags" : {
     "OtherPatientIDs" : "(null)",
     "PatientBirthDate" : "0",
     "PatientID" : "000000185",
     "PatientName" : "Anonymous^Unknown",
     "PatientSex" : "O"
  },
  "Studies" : [ "9ad2b0da-a406c43c-6e0df76d-1204b86f-78d12c15" ],
  "Type" : "Patient"
}
```
### Browsing from the patient down to the instance( Lấy dữ liệu ảnh từ thông tin của bệnh nhân)
Field danh sách tất cả `Studies` liên kế với bệnh nhân `Patient`. Do vậy với thông tin của bệnh nhân ta có thể lấy được các thông tin thấp hơn của bệnh nhân đó:
```bash
$ curl http://localhost:8042/studies/9ad2b0da-a406c43c-6e0df76d-1204b86f-78d12c15
```
Và Orthanc server sẽ trả lại json:
```json
{
  "ID" : "9ad2b0da-a406c43c-6e0df76d-1204b86f-78d12c15",
  "MainDicomTags" : {
     "AccessionNumber" : "(null)",
     "StudyDate" : "20120716",
     "StudyDescription" : "TestSUVce-TF",
     "StudyID" : "23848",
     "StudyInstanceUID" : "1.2.840.113704.1.111.7016.1342451220.40",
     "StudyTime" : "170728"
  },
  "ParentPatient" : "07a6ec1c-1be5920b-18ef5358-d24441f3-10e926ea",
  "Series" : [
     "6821d761-31fb55a9-031ebecb-ba7f9aae-ffe4ddc0",
     "2cc6336f-2d4ae733-537b3ca3-e98184b1-ba494b35",
     "7384c47e-6398f2a8-901846ef-da1e2e0b-6c50d598"
  ],
  "Type" : "Study"
}
```
Những thông tin nhận được này là của study level. Chúng có thể sửa dụng Patient để lấy của thông tin cấp thấp hơn. Tuy nhiên khá hơn khi sử dụng array `Series`:
```bash
 $ curl http://localhost:8042/series/2cc6336f-2d4ae733-537b3ca3-e98184b1-ba494b35
 ```
 Json trả laij:
 ```json
 {
  "ExpectedNumberOfInstances" : 45,
  "ID" : "2cc6336f-2d4ae733-537b3ca3-e98184b1-ba494b35",
  "Instances" : [
     "41bc3f74-360f9d10-6ae9ffa4-01ea2045-cbd457dd",
     "1d3de868-6c4f0494-709fd140-7ccc4c94-a6daa3a8",
     <...>
     "1010f80b-161b71c0-897ec01b-c85cd206-e669a3ea",
     "e668dcbf-8829a100-c0bd203b-41e404d9-c533f3d4"
  ],
  "MainDicomTags" : {
     "Manufacturer" : "Philips Medical Systems",
     "Modality" : "PT",
     "NumberOfSlices" : "45",
     "ProtocolName" : "CHU/Body_PET/CT___50",
     "SeriesDate" : "20120716",
     "SeriesDescription" : "[WB_CTAC] Body",
     "SeriesInstanceUID" : "1.3.46.670589.28.2.12.30.26407.37145.2.2516.0.1342458737",
     "SeriesNumber" : "587370",
     "SeriesTime" : "171121",
     "StationName" : "r054-svr"
  },
  "ParentStudy" : "9ad2b0da-a406c43c-6e0df76d-1204b86f-78d12c15",
  "Status" : "Complete",
  "Type" : "Series"
}
 ```
 JSON chứa các thông tin quan trọng của series này ví dụ: `"ExpectedNumberOfInstances" : 45` 
 Chúng ta biết series này có 45 ảnh
 
 Cuối cùng chúng ta có thể lấy thông tin cuar: patient, study, series. Cuối cùng là lấy thông tin từ instance level:
 ```bash
 $ curl http://localhost:8042/instances/e668dcbf-8829a100-c0bd203b-41e404d9-c533f3d4
 ```
Thông tin trả về:
```json
{
  "FileSize" : 70356,
  "FileUuid" : "3fd265f0-c2b6-41a2-ace8-ae332db63e06",
  "ID" : "e668dcbf-8829a100-c0bd203b-41e404d9-c533f3d4",
  "IndexInSeries" : 6,
  "MainDicomTags" : {
     "ImageIndex" : "6",
     "InstanceCreationDate" : "20120716",
     "InstanceCreationTime" : "171344",
     "InstanceNumber" : "6",
     "SOPInstanceUID" : "1.3.46.670589.28.2.15.30.26407.37145.3.2116.39.1342458737"
  },
  "ParentSeries" : "2cc6336f-2d4ae733-537b3ca3-e98184b1-ba494b35",
  "Type" : "Instance"
}
```
Muốn download file dicom:
```bash
$ curl http://localhost:8042/instances/e668dcbf-8829a100-c0bd203b-41e404d9-c533f3d4/file > Instance.dcm
```
### Accessing the DICOM fields of an instance as a JSON file( Truy cập thông một số fiel dicom dưới dạng json)
Một cách để laaswy thông tin của tất cả tags của một instance là:
```bash
$ curl http://localhost:8042/instances/e668dcbf-8829a100-c0bd203b-41e404d9-c533f3d4/simplified-tags
```
Dữ liệu nhận được
```json
{
  "ACR_NEMA_2C_VariablePixelDataGroupLength" : "57130",
  "AccessionNumber" : null,
  "AcquisitionDate" : "20120716",
  "AcquisitionDateTime" : "20120716171219",
  "AcquisitionTime" : "171219",
  "ActualFrameDuration" : "3597793",
  "AttenuationCorrectionMethod" : "CTAC-SG",
  <...>
  "PatientID" : "000000185",
  "PatientName" : "Anonymous^Unknown",
  "PatientOrientationCodeSequence" : [
     {
        "CodeMeaning" : "recumbent",
        "CodeValue" : "F-10450",
        "CodingSchemeDesignator" : "99SDM",
        "PatientOrientationModifierCodeSequence" : [
           {
              "CodeMeaning" : "supine",
              "CodeValue" : "F-10340",
              "CodingSchemeDesignator" : "99SDM"
           }
        ]
     }
  ],
  <...>
  "StudyDescription" : "TestSUVce-TF",
  "StudyID" : "23848",
  "StudyInstanceUID" : "1.2.840.113704.1.111.7016.1342451220.40",
  "StudyTime" : "171117",
  "TypeOfDetectorMotion" : "NONE",
  "Units" : "BQML",
  "Unknown" : null,
  "WindowCenter" : "1.496995e+04",
  "WindowWidth" : "2.993990e+04"
}
```
Nếu muốn lấy đầy đủ hơn có thể sử dụng:
```bash
$ curl http://localhost:8042/instances/e668dcbf-8829a100-c0bd203b-41e404d9-c533f3d4/tags
```
### Accessing the raw DICOM fields of an instance( Truy cập dữ liệu thô của một instance)
- Tên của bênh nhân của instance:
  ```bash
  $ curl http://localhost:8042/instances/e668dcbf-8829a100-c0bd203b-41e404d9-c533f3d4/content/0010-0010
  ```
Kết quả trả về: `Anonymous^Unknown`
- Danh sách tất cả tags có tồn tại dữ liệu:
  ```bash
  $ curl http://localhost:8042/instances/e668dcbf-8829a100-c0bd203b-41e404d9-c533f3d4/content
  ```
- Truy cập dư liệu theo các tag mong muốn:
  ```bash
  $ curl http://localhost:8042/instances/e668dcbf-8829a100-c0bd203b-41e404d9-c533f3d4/content/0008-1250/0/0040-a170/0/0008-0104
  ```
### Downloading images( Tải ảnh)
Như đã nói ở trên có thể tải một file instance:
```bash
$ curl http://localhost:8042/instances/609665c0-c5198aa2-8632476b-a00e0de0-e9075d94/file > Instance.dcm
```
Tải một file png, dạng 8bit, xem trước:
```bash
$ curl http://localhost:8042/instances/609665c0-c5198aa2-8632476b-a00e0de0-e9075d94/preview > Preview.png
```
Định dạng jpeg:
```bash
$ curl -H 'Accept: image/jpeg' http://localhost:8042/instances/609665c0-c5198aa2-8632476b-a00e0de0-e9075d94/preview > Preview.jpg
```
Chọn dạng sô bit của file png:
```bash
$ curl http://localhost:8042/instances/609665c0-c5198aa2-8632476b-a00e0de0-e9075d94/image-uint8 > full-8.png
$ curl http://localhost:8042/instances/609665c0-c5198aa2-8632476b-a00e0de0-e9075d94/image-uint16 > full-16.png
```
### Downloading studies ( Tải về các studies)
Tất cả ảnh của một studies có thể tải về ở dạng file zip:
```bash
$ curl http://localhost:8042/studies/6b9e19d9-62094390-5f9ddb01-4a191ae7-9766b715/archive > Study.zip
```
Cách khác
It is also possible to download a zipped DICOMDIR through:
```bash
$ curl http://localhost:8042/studies/6b9e19d9-62094390-5f9ddb01-4a191ae7-9766b715/media > Study.zip
```
## Deleting resources from Orthanc
### Deleting patients, studies, series or instances
```bash
$ curl -X DELETE http://localhost:8042/patients/dc65762c-f476e8b9-898834f4-2f8a5014-2599bc94
$ curl -X DELETE http://localhost:8042/studies/c4ec7f68-9b162055-2c8c5888-5bf5752f-155ab19f
$ curl -X DELETE http://localhost:8042/series/cceb768f-e0f8df71-511b0277-07e55743-9ef8890d
$ curl -X DELETE http://localhost:8042/instances/8e289db9-0e1437e1-3ecf395f-d8aae463-f4bb49fe
```


