<!-- <script>
  // core components
  import CardLineChart from "components/Cards/CardLineChart.svelte";
  import CardBarChart from "components/Cards/CardBarChart.svelte";
  import CardPageVisits from "components/Cards/CardPageVisits.svelte";
  import CardSocialTraffic from "components/Cards/CardSocialTraffic.svelte";
  export let location;
</script>

<div>
  <div class="flex flex-wrap">
    <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
      <CardLineChart />
    </div>
    <div class="w-full xl:w-4/12 px-4">
      <CardBarChart />
    </div>
  </div>
  <div class="flex flex-wrap mt-4">
    <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
      <CardPageVisits />
    </div>
    <div class="w-full xl:w-4/12 px-4">
      <CardSocialTraffic />
    </div>
  </div>
</div> -->

<script>
  import CardStackedBarChart from "components/Cards/CardStackedBarChart.svelte";
  import CardLineChart from "components/Cards/CardLineChart.svelte";
  import CardBarChart from "components/Cards/CardBarChart.svelte";
  import CardPieChart from "components/Cards/CardPieChart.svelte";
  import CardMetric from "components/Cards/CardMetric.svelte";
  import DateFilter from "components/Cards/DateFilter.svelte";
  import { getAllAttendances, getAllLeavesApi } from '../../../services/api'; // Adjust the import according to your project structure

  let startDate;
  let endDate;
  let totalLeaves = 0;
  let totalAttendance = 0;
  let totalAbsentees = 0;

  function handleUpdate(event) {
    startDate = event.detail.startDate;
    endDate = event.detail.endDate;
    fetchData();
  }

  async function fetchData() {
    try {
      const [attendances, leaves] = await Promise.all([
        getAllAttendances(startDate, endDate),
        getAllLeavesApi(startDate, endDate)
      ]);

      totalAttendance = attendances.filter(record => record.status === 'Present').length;
      totalLeaves = leaves.filter(request => request.status === 'approved').length;
      totalAbsentees = attendances.filter(record => record.status === 'Absent').length;
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

  $: if (startDate && endDate) {
    fetchData();
  }
</script>

<DateFilter on:update={handleUpdate} />

<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-4 py-10">
  <h3 class="font-semibold text-lg text-blueGray-700">
    Dashboard
  </h3>
  <br/>
  <DateFilter on:update={handleUpdate} />
  <div class="flex flex-wrap">
    <div class="w-full sm:w-4/12 px-4">
      <CardMetric title="Total Leaves" value={totalLeaves} color="#ed64a6" />
    </div>
    <div class="w-full sm:w-4/12 px-4">
      <CardMetric title="Total Attendance" value={totalAttendance} color="#4c51bf" />
    </div>
    <div class="w-full sm:w-4/12 px-4">
      <CardMetric title="Total Absentees" value={totalAbsentees} color="#f44336" />
    </div>
  </div>
  <div class="flex flex-wrap">
    <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
      <CardLineChart {startDate} {endDate} />
    </div>
    <div class="w-full xl:w-4/12 px-4">
      <CardStackedBarChart {startDate} {endDate} />
    </div>
  </div>
  <div class="flex flex-wrap">
    <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
      <CardBarChart />
    </div>
    <div class="w-full xl:w-4/12 px-4">
      <CardPieChart />
    </div>
  </div>
</div>
