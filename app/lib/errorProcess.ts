export const translateErrors = (err: any) => {
  if (err?.originalStatus == 401) {
    if (
      err?.data ==
      `crypto/bcrypt: hashedPassword is not the hash of the given password\n`
    ) {
      return "ایمیل با پسورد مطابقت ندارد";
    }
    return "شما اختیارات لازم را ندارید";
  }
  if (err?.originalStatus == 400) {
    if (
      String(err?.data)?.includes(
        `duplicate key value violates unique constraint "products_name_key"`,
      )
    ) {
      return "نام کالا تکراری است";
    }
    if (
      String(err?.data)?.includes(
        ` violates foreign key constraint \"parameters_parameter_group_id_fkey\" `,
      )
    ) {
      return "برای این دسته بندی پارامتر تعریف شده است";
    }
    if (
      String(err?.data)?.includes(
        `violates foreign key constraint \"products_category_id_fkey\"`,
      )
    ) {
      return "برای این دسته بندی کالا تعریف شده است";
    }
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
