### GIT FILTER-REPO ###

## NÃO EXECUTE ESSE SCRIPT DIRETAMENTE
## Esse script foi feito para uso do
## script 'publisher.sh' fornecido 
## pela Trybe. 

[[ $# == 1 ]] && \
[[ $1 == "trybe-security-parameter" ]] && \
git filter-repo \
    --path .trybe \
    --path .github \
    --path cypress \
    --path cypress-specs.jpeg \
    --path cypress.json \
    --path pull-request-para-branch-do-grupo.png \
    --path README.md \
    --path reporter.json \
    --path req6.gif \
    --path trello.gif \
    --path trybe-filter-repo.sh \
    --path trybe.yml \
    --invert-paths --force 