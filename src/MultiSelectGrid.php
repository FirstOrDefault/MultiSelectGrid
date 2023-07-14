<?php

namespace FirstOrDefault\MultiSelect;

use SilverStripe\Forms\FormField;

class MultiSelectGrid extends FormField
{


    protected $schemaDataType = FormField::SCHEMA_DATA_TYPE_CUSTOM;

    private $data;

    public function __construct(
        $name,
        $title = null,
        $value = null,
        $data = null,
        $filterConfig = null,
        $columnConfig = null,
        $initialSelected = null
    ) {
        parent::__construct($name, $title, $value);
        $this->data = $data;

        $this->setAttribute('data-state', json_encode([
            'data' => $this->data,
            'filterConfig' => $filterConfig,
            'columnConfig' => $columnConfig,
            'initialSelected' => $initialSelected
        ]));
    }

    protected $schemaComponent = 'MultiSelectGrid';


}
