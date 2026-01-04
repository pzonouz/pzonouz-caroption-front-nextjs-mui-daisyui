export const translateErrors = (err: any) => {
  if (err?.originalStatus == 401) {
    return "شما اختیارات لازم را ندارید";
  }
  if (err?.originalStatus == 400) {
    if (String(err?.data)?.includes(`unique constraint \"users_email_key\"`)) {
      return "ایمیل تکراری است";
    }
    if (
      String(err?.data)?.includes(`unique constraint \"categories_name_key\"`)
    ) {
      return "نام دسته بندی تکراری است";
    }
  }
  return JSON.stringify(err);
};
