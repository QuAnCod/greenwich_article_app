export const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export const validatePassword = (password) => {
    return password.length >= 5;
}

export const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
}

export const findFinalDeadline = (closures, faculty_id) => {
    const currentYear = closures.filter((closure) => closure.academicYear.current === 1);
    // console.log(closuresCurrent);
    const closuresFound = currentYear.find((closure) => closure.faculty.id === faculty_id);
    // console.log(closuresFound);
    const date = new Date(closuresFound?.finalDeadline);
    // console.log(date.toDateString());
    return date;
}

export const findDeadline = (closures, faculty_id) => {
    const currentYear = closures.filter((closure) => closure.academicYear.current === 1);
    const closuresFound = currentYear.find((closure) => closure.faculty.id === faculty_id);
    const date = new Date(closuresFound?.deadline);
    return date;
}

export const filterArticleByStatus = (articles, status) => {
    return articles.filter((article) => article.status === status);
}

