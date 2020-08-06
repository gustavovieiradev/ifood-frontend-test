import React, { useCallback } from 'react';

import { IFilters } from '../../models';

import ptBr from 'date-fns/locale/pt-BR';
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Filter } from './styles';

interface IFilterProps {
  filters: IFilters[];
  fieldFilter: any;
  changeSelectFilter(ev: any, filter: IFilters): void;
  changeFieldTimestamp(ev: any, filter: IFilters): void;
  changeFieldNumber(ev: any, min?: number, max?: number): void;
  clearFilters(): void;
}

const Filters: React.FC<IFilterProps> = ({ filters, fieldFilter, changeSelectFilter, changeFieldTimestamp, changeFieldNumber, clearFilters }) => {  
  registerLocale('pt-BR', ptBr);

  const isEmptyFilters = useCallback((): boolean => {
    let empty = true;
    filters.every(filter => {
      if (fieldFilter[filter.id]) {
        empty = false;
        return empty;
      }
    })
    return empty;
  }, [fieldFilter, filters]);

  return (
    <Filter>
      <div className="filters">
        {filters.map(filter => (
          <div key={filter.id}>
            {filter.values?.length && (
              <select onChange={(ev) => changeSelectFilter(ev, filter)} name={filter.id} value={fieldFilter[filter.id] ? fieldFilter[filter.id] : ""}>
                <option value="">{filter.name}</option>
                {filter.values.map(filterValue => (
                  <option key={filterValue.value} value={filterValue.value}>{filterValue.name}</option>
                ))}
              </select>
            )}

            {filter.validation?.entityType === 'DATE_TIME' && (
              <DatePicker
                selected={fieldFilter[filter.id]}
                placeholderText={filter.name}
                onChange={(ev) => changeFieldTimestamp(ev, filter)}
                locale="pt-BR"
                showTimeInput
                shouldCloseOnSelect={false}
                timeInputLabel="Hora:"
                dateFormat="dd/MM/yyyy HH:mm"
              />
            )}

            {filter.validation?.primitiveType === 'INTEGER' && (
              <input type="number" name={filter.id} onChange={(ev) => changeFieldNumber(ev, filter.validation?.min, filter.validation?.max)} placeholder={filter.name} value={fieldFilter[filter.id] ? fieldFilter[filter.id] : ""} />
            )}
    
          </div>
        ))}
      </div>
      {!isEmptyFilters() && (
        <button type="button" onClick={clearFilters} className="clear-button">
          Limpar filtros
        </button>
      )}
    </Filter>
  )
}

export default Filters;